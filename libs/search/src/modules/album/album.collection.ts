import { App } from '@api.mabell/core';
import { BaseCollection } from '../../base/base-collection.abstract';
import { Album } from './album.document';
import { AlbumPayload } from './types';
import AlbumMapper from './album.mapper';
import { ArtistPayload } from '../artist/types';

export class AlbumCollection extends BaseCollection<Album, App.DTOs.IndexedAlbumDTO, AlbumPayload> {
  constructor() {
    const collectionName = 'albums';

    super(
      collectionName,
      {
        name: collectionName,
        fields: [
          { name: 'id', type: 'string', index: false },
          { name: 'name', type: 'string', index: true },
          { name: 'artistNames', type: 'string[]', index: true },
          { name: 'artistIds', type: 'string[]', index: true },
          { name: 'cover', type: 'string', optional: true, index: false },
          { name: 'isGlobal', type: 'bool', index: true },
        ],
      },
      AlbumMapper,
    );
  }

  async find(q: string, isGlobal?: boolean) {
    const { items } = await this.search({
      q,
      query_by: ['name', 'artistNames'],
      ...(Boolean(isGlobal) && {
        filter_by: `isGlobal:=${isGlobal}`,
      }),
    });

    return items.map((item) => this._mapper.toDTO(item));
  }

  async updateArtistsDataByArtistId(artistId: string, payload: ArtistPayload) {
    const docs: Album[] = [];
    const limit = 250;
    let offset = 0;

    while (true) {
      const { items, hasMore } = await this.search({
        q: '*',
        filter_by: `artistIds:=[${artistId}]`,
        offset,
        limit,
      });

      docs.push(...items);

      if (!hasMore) break;

      offset = offset + limit;
    }

    if (!docs.length) return;

    docs.forEach((doc) => {
      const albumArtistIndex = doc.artistIds.findIndex((id) => id === artistId);

      doc.artistNames[albumArtistIndex] = payload.name;
    });

    await this._client.collections('albums').documents().import(docs, { action: 'upsert' });
  }

  async deleteByArtistId(artistId: string) {
    await this._client
      .collections(this._collectionName)
      .documents()
      .delete({
        filter_by: `artistIds:${artistId}`,
      });
  }
}
