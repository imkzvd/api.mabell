import { Inject, Injectable } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { ArtistCollection } from './artist.collection';
import ArtistMapper from './artist.mapper';
import { ArtistsDTO } from './dtos/artists.dto';

@Injectable()
export class ArtistService {
  constructor(@Inject(ArtistCollection) private readonly _artistCollection: ArtistCollection) {}

  async getByQuery(
    q: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<ArtistsDTO> {
    const foundDocs = await this._artistCollection.findByQuery(q, options);

    return new ArtistsDTO(
      foundDocs.items.map(({ item, score }) => ({
        item: ArtistMapper.toDTO(item),
        score,
      })),
      foundDocs.total,
      foundDocs.offset,
      foundDocs.limit,
    );
  }

  async getById(
    id: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedArtistDTO | null> {
    const foundDoc = await this._artistCollection.findById(id, options);

    return foundDoc ? ArtistMapper.toDTO(foundDoc) : null;
  }

  async getByIds(
    ids: string[],
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedArtistDTO[]> {
    const foundDocs = await this._artistCollection.findByIds(ids, options);
    const mapIds = new Map<string, number>();

    ids.forEach((id, index) => mapIds.set(id, index));

    foundDocs.sort((a, b) => mapIds.get(a.id)! - mapIds.get(b.id)!);

    return foundDocs.map((doc) => ArtistMapper.toDTO(doc));
  }
}
