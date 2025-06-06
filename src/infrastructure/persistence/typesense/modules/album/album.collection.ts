import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { TypeSenseClient } from '../../client';
import { AlbumDocument } from './album.document';
import { BaseCollection } from '../../base/base-collection.interface';
import { IndexedAlbumDTO } from '../../../../../core/app/components/search/ports/search-service/dtos/indexed-album.dto';
import AlbumMapper from './album.mapper';
import { AlbumWithArtistsDTO } from '../../../../../core/domain/components/album/repository/dtos/album-with-artists.dto';

export class AlbumCollection implements BaseCollection<IndexedAlbumDTO, AlbumWithArtistsDTO> {
  private readonly _collectionName = 'albums';
  private readonly _collectionSchema: CollectionCreateSchema = {
    name: this._collectionName,
    enable_nested_fields: true,
    fields: [
      { name: 'name', type: 'string' },
      { name: 'artists', type: 'object[]' },
      { name: 'artistNames', type: 'string[]' },
      { name: 'isPublic', type: 'bool' },
      { name: 'cover', type: 'string', optional: true },
      { name: 'releaseAt', type: 'string', optional: true },
    ],
  };

  constructor() {
    void this.createCollection();
  }

  async save(dto: AlbumWithArtistsDTO): Promise<void> {
    const mappedDoc = AlbumMapper.toDocument(dto);

    await TypeSenseClient.collections<AlbumDocument>(this._collectionName)
      .documents()
      .upsert(mappedDoc);
  }

  async searchByQuery(q: string): Promise<IndexedAlbumDTO[]> {
    const result = await TypeSenseClient.collections<AlbumDocument>(this._collectionName)
      .documents()
      .search({ q, query_by: 'name,artistNames' });

    return result.hits?.map(({ document }) => AlbumMapper.toDTO(document)) || [];
  }

  async deleteById(id: string): Promise<void> {
    await TypeSenseClient.collections<AlbumDocument>(this._collectionName).documents(id).delete();
  }

  async deleteByIds(ids: string[]): Promise<void> {
    const promiseQueue = Promise.all(
      ids.map((id) => {
        return TypeSenseClient.collections<AlbumDocument>(this._collectionName)
          .documents(id)
          .delete();
      }),
    );

    await promiseQueue;
  }

  private async createCollection(): Promise<void> {
    const isExistCollection = await TypeSenseClient.collections(this._collectionName).exists();

    if (isExistCollection) return;

    // await TypeSenseClient.collections(this._collectionName).delete();
    await TypeSenseClient.collections().create(this._collectionSchema);
  }
}
