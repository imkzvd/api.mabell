import { IndexedPlaylistDTO } from '@api.mabell/core';
import { Playlist } from './playlist.document';
import { PlaylistPayload } from './types';
import PlaylistMapper from './playlist.mapper';
import { BaseCollection } from '../../base/base-collection.abstract';
import { UserPayload } from '../user/types';

export class PlaylistCollection extends BaseCollection<
  Playlist,
  IndexedPlaylistDTO,
  PlaylistPayload
> {
  constructor() {
    super(
      'playlists',
      {
        name: 'playlists',
        fields: [
          { name: 'id', type: 'string', index: false },
          { name: 'name', type: 'string' },
          { name: 'userId', type: 'string' },
          { name: 'userName', type: 'string', index: false },
          { name: 'cover', type: 'string', optional: true, index: false },
          { name: 'isGlobal', type: 'bool' },
        ],
      },
      PlaylistMapper,
    );
  }

  async find(q: string, isGlobal?: boolean) {
    const { items } = await this.search({
      q,
      query_by: 'name',
      ...(Boolean(isGlobal) && {
        filter_by: `isGlobal:=${isGlobal}`,
      }),
    });

    return items.map((item) => this._mapper.toDTO(item));
  }

  async updateUserDataByUserId(userId: string, payload: UserPayload) {
    const docs: Playlist[] = [];
    const limit = 250;
    let offset = 0;

    while (true) {
      const { items, hasMore } = await this.search({
        q: '*',
        filter_by: `userId:=${userId}`,
        offset,
        limit,
      });

      docs.push(...items);

      if (!hasMore) break;

      offset = offset + limit;
    }

    if (!docs.length) return;

    docs.forEach((doc) => {
      doc.userName = payload.name;
    });

    await this._client.collections('playlists').documents().import(docs, { action: 'upsert' });
  }

  async deleteByUserId(id: string) {
    await this._client
      .collections('playlists')
      .documents()
      .delete({
        filter_by: `userId:${id}`,
      });
  }
}
