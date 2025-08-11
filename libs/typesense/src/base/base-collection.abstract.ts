import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { SearchParams } from 'typesense/lib/Typesense/Documents';
import { OffsetLimitPaginationResponseDTO } from '@api.mabell/core';
import { BaseMapper } from './base-mapper.interface';
import { TypeSenseClient } from '../client';
import { DEFAULT_LIMIT } from '../constants';

export abstract class BaseCollection<
  Doc extends Record<string, any>,
  DTO extends Record<string, any>,
  Payload extends Record<string, any>,
> {
  protected readonly _client = TypeSenseClient;

  constructor(
    private readonly _collectionName: string,
    private readonly _collectionSchema: CollectionCreateSchema,
    protected readonly _mapper: BaseMapper<Doc, DTO, Payload>,
  ) {}

  async init() {
    const isExistCollection = await this._client.collections(this._collectionName).exists();

    if (!isExistCollection) {
      await this._client.collections().create(this._collectionSchema);
    }
  }

  async save(payload: Payload): Promise<void> {
    const mappedDoc = this._mapper.toDocument(payload);

    await this._client.collections<Doc>(this._collectionName).documents().upsert(mappedDoc);
  }

  async saveMany(payload: Payload[]): Promise<void> {
    const docs = payload.map((dto) => this._mapper.toDocument(dto));
    const promiseQueue = Promise.all(
      docs.map((doc) => this._client.collections(this._collectionName).documents().upsert(doc)),
    );

    await promiseQueue;
  }

  async delete(id: string): Promise<void> {
    await this._client.collections(this._collectionName).documents(id).delete();
  }

  async deleteMany(ids: string[]): Promise<void> {
    const promiseQueue = Promise.all(
      ids.map((id) => {
        return this._client.collections(this._collectionName).documents(id).delete();
      }),
    );

    await promiseQueue;
  }

  protected async search(
    params: Pick<SearchParams, 'q' | 'query_by' | 'filter_by' | 'offset' | 'limit'>,
  ): Promise<OffsetLimitPaginationResponseDTO<Doc>> {
    const result = await this._client
      .collections<Doc>(this._collectionName)
      .documents()
      .search(params);

    return new OffsetLimitPaginationResponseDTO(
      result.hits?.map(({ document }) => document) || [],
      result.found,
      params.limit || DEFAULT_LIMIT,
      params.offset || 0,
      (params.limit || DEFAULT_LIMIT) + (params.offset || 0) < result.found,
    );
  }
}
