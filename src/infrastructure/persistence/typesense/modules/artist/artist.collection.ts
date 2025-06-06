import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { TypeSenseClient } from '../../client';
import ArtistMapper from './artist.mapper';
import { ArtistDocument } from './artist.document';
import { IndexedArtistDTO } from '../../../../../core/app/components/search/ports/search-service/dtos/indexed-artist.dto';
import { BaseCollection } from '../../base/base-collection.interface';
import { ArtistDTO } from '../../../../../core/domain/components/artist/repository/dtos/artist.dto';

export class ArtistCollection implements BaseCollection<IndexedArtistDTO, ArtistDTO> {
  private readonly _collectionName = 'artists';
  private readonly _collectionSchema: CollectionCreateSchema = {
    name: this._collectionName,
    fields: [
      { name: 'name', type: 'string' },
      { name: 'isPublic', type: 'bool' },
      { name: 'birthName', type: 'string', optional: true },
      { name: 'avatar', type: 'string', optional: true },
    ],
  };

  constructor() {
    void this.createCollection();
  }

  async save(dto: ArtistDTO): Promise<void> {
    const mappedDoc = ArtistMapper.toDocument(dto);

    await TypeSenseClient.collections<ArtistDocument>(this._collectionName)
      .documents()
      .upsert(mappedDoc);
  }

  async searchByQuery(q: string): Promise<IndexedArtistDTO[]> {
    const result = await TypeSenseClient.collections<ArtistDocument>(this._collectionName)
      .documents()
      .search({ q, query_by: 'name,birthName' });

    return result.hits?.map(({ document }) => ArtistMapper.toDTO(document)) || [];
  }

  async deleteById(id: string): Promise<void> {
    await TypeSenseClient.collections<ArtistDocument>(this._collectionName).documents(id).delete();
  }

  private async createCollection(): Promise<void> {
    const isExistCollection = await TypeSenseClient.collections(this._collectionName).exists();

    if (isExistCollection) return;

    // await TypeSenseClient.collections(this._collectionName).delete();
    await TypeSenseClient.collections().create(this._collectionSchema);
  }
}
