import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { Shared } from '@api.mabell/core';
import { BaseMapper } from './base-mapper.interface';
import { TypeSenseClient } from '../client';
import { ItemWithScore } from '../types';

export abstract class BaseCollection<
  Doc extends Record<string, any>,
  DTO extends Record<string, any>,
  Payload extends Record<string, any>,
> {
  protected readonly _client = TypeSenseClient;

  constructor(
    public readonly _collectionName: string,
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

  async findById(docId: string, options?: Partial<{ isGlobal: boolean }>): Promise<Doc | null> {
    try {
      const foundDoc = await this._client
        .collections<Doc>(this._collectionName)
        .documents(docId)
        .retrieve();

      if (Boolean(options?.isGlobal) && foundDoc.isGlobal === false) {
        return null;
      }

      return foundDoc;
    } catch {
      return null;
    }
  }

  async findByIds(docIds: string[], options?: Partial<{ isGlobal: boolean }>): Promise<Doc[]> {
    const filterQuery = `id:[${docIds.join(',')}]${typeof options?.isGlobal === 'boolean' ? ` && isGlobal:=${options.isGlobal}` : ''}`;

    const result = await this._client.collections<Doc>(this._collectionName).documents().search({
      q: '*',
      filter_by: filterQuery,
    });

    return result.hits?.map(({ document }) => document) || [];
  }

  async deleteById(docId: string): Promise<void> {
    await this._client.collections(this._collectionName).documents(docId).delete();
  }

  async deleteByIds(docIds: string[]): Promise<void> {
    const promiseQueue = Promise.all(
      docIds.map((id) => {
        return this._client.collections(this._collectionName).documents(id).delete();
      }),
    );

    await promiseQueue;
  }

  protected async search(params: {
    q: string;
    query_by?: string | string[];
    filter_by?: string;
    offset?: number;
    limit?: number;
    sort_by?: string;
  }): Promise<Shared.DTOs.OffsetLimitPaginationResponseDTO<ItemWithScore<Doc>>> {
    const result = await this._client
      .collections<Doc>(this._collectionName)
      .documents()
      .search(params);

    return new Shared.DTOs.OffsetLimitPaginationResponseDTO(
      result.hits?.map(({ document, text_match_info }) => ({
        item: document,
        score: parseInt(text_match_info?.score || '0', 10),
      })) || [],
      result.found,
      params.offset,
      params.limit,
    );
  }
}
