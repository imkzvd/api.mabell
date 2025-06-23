import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { IndexedAlbumDTO } from '@core/app/components/search/ports/search-service/dtos/indexed-album.dto';
import { AlbumWithArtistsDTO } from '@core/domain/components/album/repository/dtos/album-with-artists.dto';
import { Album } from './album.document';
import AlbumMapper from './album.mapper';
import { TypeSenseClient } from '../../client';
import { BaseCollection } from '../../base/base-collection.interface';

export class AlbumCollection implements BaseCollection<IndexedAlbumDTO, AlbumWithArtistsDTO> {
  private readonly _collectionName = 'albums';
  private readonly _collectionSchema: CollectionCreateSchema = {
    name: this._collectionName,
    enable_nested_fields: true,
    fields: [
      { name: 'name', type: 'string' },
      { name: 'artistNames', type: 'string[]' },
    ],
  };

  constructor() {
    void this.createCollection();
  }

  async save(dto: AlbumWithArtistsDTO): Promise<void> {
    const mappedDoc = AlbumMapper.toDocument(dto);

    await TypeSenseClient.collections<Album>(this._collectionName).documents().upsert(mappedDoc);
  }

  async searchByQuery(q: string): Promise<IndexedAlbumDTO[]> {
    const result = await TypeSenseClient.collections<Album>(this._collectionName)
      .documents()
      .search({ q, query_by: 'name,artistNames' });

    return result.hits?.map(({ document }) => AlbumMapper.toDTO(document)) || [];
  }

  async deleteById(id: string): Promise<void> {
    await TypeSenseClient.collections<Album>(this._collectionName).documents(id).delete();
  }

  async deleteByIds(ids: string[]): Promise<void> {
    const promiseQueue = Promise.all(
      ids.map((id) => {
        return TypeSenseClient.collections<Album>(this._collectionName).documents(id).delete();
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
