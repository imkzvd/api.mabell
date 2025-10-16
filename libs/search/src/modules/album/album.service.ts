import { Inject, Injectable } from '@nestjs/common';
import { App } from '@api.mabell/core';
import AlbumMapper from './album.mapper';
import { AlbumCollection } from './album.collection';
import { AlbumsDTO } from './dtos/albums.dto';

@Injectable()
export class AlbumService {
  constructor(@Inject(AlbumCollection) private readonly _albumCollection: AlbumCollection) {}

  async getByQuery(
    q: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<AlbumsDTO> {
    const foundDocs = await this._albumCollection.findByQuery(q, options);

    return new AlbumsDTO(
      foundDocs.items.map(({ item, score }) => ({
        item: AlbumMapper.toDTO(item),
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
  ): Promise<App.DTOs.IndexedAlbumDTO | null> {
    const foundDoc = await this._albumCollection.findById(id, options);

    return foundDoc ? AlbumMapper.toDTO(foundDoc) : null;
  }

  async getByIds(
    ids: string[],
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedAlbumDTO[]> {
    const foundDocs = await this._albumCollection.findByIds(ids, options);
    const mapIds = new Map<string, number>();

    ids.forEach((id, index) => mapIds.set(id, index));

    foundDocs.sort((a, b) => mapIds.get(a.id)! - mapIds.get(b.id)!);

    return foundDocs.map((doc) => AlbumMapper.toDTO(doc));
  }
}
