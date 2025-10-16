import { Inject, Injectable } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { PlaylistCollection } from './playlist.collection';
import PlaylistMapper from './playlist.mapper';
import { PlaylistsDTO } from './dtos/playlists.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @Inject(PlaylistCollection) private readonly _playlistCollection: PlaylistCollection,
  ) {}

  async getByQuery(
    q: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<PlaylistsDTO> {
    const foundDocs = await this._playlistCollection.findByQuery(q, options);

    return new PlaylistsDTO(
      foundDocs.items.map(({ item, score }) => ({
        item: PlaylistMapper.toDTO(item),
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
  ): Promise<App.DTOs.IndexedPlaylistDTO | null> {
    const foundDoc = await this._playlistCollection.findById(id, options);

    return foundDoc ? PlaylistMapper.toDTO(foundDoc) : null;
  }

  async getByIds(
    ids: string[],
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedPlaylistDTO[]> {
    const foundDocs = await this._playlistCollection.findByIds(ids, options);
    const mapIds = new Map<string, number>();

    ids.forEach((id, index) => mapIds.set(id, index));

    foundDocs.sort((a, b) => mapIds.get(a.id)! - mapIds.get(b.id)!);

    return foundDocs.map((doc) => PlaylistMapper.toDTO(doc));
  }
}
