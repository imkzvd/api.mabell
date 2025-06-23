import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { IndexedArtistDTO } from '@core/app/components/search/ports/search-service/dtos/indexed-artist.dto';
import { ArtistDTO } from '@core/domain/components/artist/repository/dtos/artist.dto';
import ArtistMapper from './artist.mapper';
import { Artist } from './artist.document';
import { TypeSenseClient } from '../../client';
import { BaseCollection } from '../../base/base-collection.interface';

export class ArtistCollection implements BaseCollection<IndexedArtistDTO, ArtistDTO> {
  private readonly _collectionName = 'artists';
  private readonly _collectionSchema: CollectionCreateSchema = {
    name: this._collectionName,
    fields: [
      { name: 'name', type: 'string' },
      { name: 'isGlobal', type: 'bool' },
    ],
  };

  constructor() {
    void this.createCollection();
  }

  async save(dto: ArtistDTO): Promise<void> {
    const mappedDoc = ArtistMapper.toDocument(dto);

    await TypeSenseClient.collections<Artist>(this._collectionName).documents().upsert(mappedDoc);
  }

  async searchByQuery(q: string): Promise<IndexedArtistDTO[]> {
    const result = await TypeSenseClient.collections<Artist>(this._collectionName)
      .documents()
      .search({ q, query_by: 'name' });

    return result.hits?.map(({ document }) => ArtistMapper.toDTO(document)) || [];
  }

  async deleteById(id: string): Promise<void> {
    await TypeSenseClient.collections<Artist>(this._collectionName).documents(id).delete();
  }

  private async createCollection(): Promise<void> {
    const isExistCollection = await TypeSenseClient.collections(this._collectionName).exists();

    if (isExistCollection) return;

    await TypeSenseClient.collections().create(this._collectionSchema);
  }
}
