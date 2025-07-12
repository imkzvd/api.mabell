import { Client } from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { BaseMapper } from '@infrastructure/typesense/base/base-mapper.interface';

export abstract class BaseCollection<
  Doc extends Record<string, any>,
  DTO extends Record<string, any>,
  Payload extends Record<string, any>,
> {
  constructor(
    private readonly _client: Client,
    private readonly _collectionName: string,
    private readonly _collectionSchema: CollectionCreateSchema,
    private readonly _mapper: BaseMapper<Doc, DTO, Payload>,
    private readonly _queryBy: string,
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

  async search(q: string): Promise<DTO[]> {
    const result = await this._client
      .collections<Doc>(this._collectionName)
      .documents()
      .search({ q, query_by: this._queryBy });

    return result.hits?.map(({ document }) => this._mapper.toDTO(document)) || [];
  }
}
