import { IndexedAlbumDTO } from '@api.mabell/core';
import { BaseCollection } from '../../base/base-collection.abstract';
import { Album } from './album.document';
import { AlbumPayload } from './types';
import AlbumMapper from './album.mapper';
import { ArtistPayload } from '../artist/types';

export class AlbumCollection extends BaseCollection<Album, IndexedAlbumDTO, AlbumPayload> {
  constructor() {
    super(
      'albums',
      {
        name: 'albums',
        fields: [
          { name: 'id', type: 'string', index: false },
          { name: 'name', type: 'string' },
          { name: 'artistNames', type: 'string[]' },
          { name: 'artistIds', type: 'string[]' },
          { name: 'cover', type: 'string', optional: true, index: false },
          { name: 'isGlobal', type: 'bool' },
        ],
      },
      AlbumMapper,
    );
  }

  async find(q: string, isGlobal?: boolean) {
    const { items } = await this.search({
      q,
      query_by: 'name,artistNames',
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

  async deleteByArtistId(id: string) {
    await this._client
      .collections('albums')
      .documents()
      .delete({
        filter_by: `artistIds:${id}`,
      });
  }
}
