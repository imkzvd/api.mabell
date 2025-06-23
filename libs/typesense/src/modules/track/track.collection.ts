import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { Track } from './track.document';
import TrackMapper from './track.mapper';
import { TypeSenseClient } from '../../client';
import { BaseCollection } from '../../base/base-collection.interface';
import { IndexedTrackDTO } from '../../../../../src/core/app/components/search/ports/search-service/dtos/indexed-track.dto';
import { TrackDTO } from '../../../../../src/core/app/components/track/dtos/track.dto';

export class TrackCollection implements BaseCollection<IndexedTrackDTO, TrackDTO> {
  private readonly _collectionName = 'tracks';
  private readonly _collectionSchema: CollectionCreateSchema = {
    name: this._collectionName,
    enable_nested_fields: true,
    fields: [
      { name: 'name', type: 'string' },
      { name: 'albumName', type: 'string' },
      { name: 'allArtistNames', type: 'string[]' },
      { name: 'isGlobal', type: 'bool' },
    ],
  };

  constructor() {
    void this.createCollection();
  }

  async save(dto: TrackDTO): Promise<void> {
    const mappedDoc = TrackMapper.toDocument(dto);

    await TypeSenseClient.collections<Track>(this._collectionName).documents().upsert(mappedDoc);
  }

  async saveMany(dtos: TrackDTO[]): Promise<void> {
    const docs = dtos.map((dto) => TrackMapper.toDocument(dto));
    const promiseQueue = Promise.all(
      docs.map((doc) =>
        TypeSenseClient.collections<Track>(this._collectionName).documents().upsert(doc),
      ),
    );

    await promiseQueue;
  }

  async searchByQuery(q: string): Promise<IndexedTrackDTO[]> {
    const result = await TypeSenseClient.collections<Track>(this._collectionName)
      .documents()
      .search({ q, query_by: 'name,albumName,allArtistNames' });

    return result.hits?.map(({ document }) => TrackMapper.toDTO(document)) || [];
  }

  async deleteById(id: string): Promise<void> {
    await TypeSenseClient.collections<Track>(this._collectionName).documents(id).delete();
  }

  async deleteByIds(ids: string[]): Promise<void> {
    const promiseQueue = Promise.all(
      ids.map((id) => {
        return TypeSenseClient.collections<Track>(this._collectionName).documents(id).delete();
      }),
    );

    await promiseQueue;
  }

  private async createCollection(): Promise<void> {
    const isExistCollection = await TypeSenseClient.collections(this._collectionName).exists();

    if (isExistCollection) return;

    await TypeSenseClient.collections().create(this._collectionSchema);
  }
}
