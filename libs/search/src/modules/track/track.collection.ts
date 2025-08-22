import { App } from '@api.mabell/core';
import { TrackPayload } from './types';
import { Track } from './track.document';
import TrackMapper from './track.mapper';
import { ArtistPayload } from '../artist/types';
import { AlbumPayload } from '../album/types';
import { BaseCollection } from '../../base/base-collection.abstract';

export class TrackCollection extends BaseCollection<Track, App.DTOs.IndexedTrackDTO, TrackPayload> {
  constructor() {
    const collectionName = 'tracks';

    super(
      collectionName,
      {
        name: collectionName,
        fields: [
          { name: 'id', type: 'string', index: false },
          { name: 'name', type: 'string', index: true },
          { name: 'albumId', type: 'string', index: true },
          { name: 'albumName', type: 'string', index: true },
          { name: 'artistIds', type: 'string[]', index: true },
          { name: 'artistNames', type: 'string[]', index: true },
          { name: 'featArtistIds', type: 'string[]', index: true },
          { name: 'featArtistNames', type: 'string[]', index: true },
          { name: 'isExplicit', type: 'bool', index: false },
          { name: 'cover', type: 'string', optional: true, index: false },
          { name: 'isGlobal', type: 'bool', index: true },
        ],
      },
      TrackMapper,
    );
  }

  async find(q: string, isGlobal?: boolean) {
    const { items } = await this.search({
      q,
      query_by: ['name', 'albumName', 'artistNames', 'featArtistNames'],
      ...(Boolean(isGlobal) && {
        filter_by: `isGlobal:=${isGlobal}`,
      }),
    });

    return items.map((item) => this._mapper.toDTO(item));
  }

  async updateAlbumDataByAlbumId(albumId: string, payload: AlbumPayload) {
    const docs: Track[] = [];
    const limit = 250;
    let offset = 0;

    while (true) {
      const { items, hasMore } = await this.search({
        q: '*',
        filter_by: `albumId:=${albumId}`,
        offset,
        limit,
      });

      docs.push(...items);

      if (!hasMore) break;

      offset = offset + limit;
    }

    if (!docs.length) return;

    docs.forEach((doc) => {
      doc.albumName = payload.name;
      doc.artistIds = payload.artists.map(({ id }) => id);
      doc.artistNames = payload.artists.map(({ name }) => name);
      doc.cover = payload.cover || undefined;
    });

    await this._client
      .collections(this._collectionName)
      .documents()
      .import(docs, { action: 'upsert' });
  }

  async updateArtistDataByArtistId(artistId: string, payload: ArtistPayload) {
    const docs: Track[] = [];
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
      const trackArtistIndex = doc.artistIds.findIndex((id) => id === artistId);

      doc.artistNames[trackArtistIndex] = payload.name;
    });

    await this._client.collections('tracks').documents().import(docs, { action: 'upsert' });
  }

  async updateFeatArtistDataByArtistId(artistId: string, payload: ArtistPayload) {
    const docs: Track[] = [];
    const limit = 250;
    let offset = 0;

    while (true) {
      const { items, hasMore } = await this.search({
        q: '*',
        filter_by: `featArtistIds:=[${artistId}]`,
        offset,
        limit,
      });

      docs.push(...items);

      if (!hasMore) break;

      offset = offset + limit;
    }

    if (!docs.length) return;

    docs.forEach((doc) => {
      const trackFeatArtistIndex = doc.featArtistIds.findIndex((id) => id === artistId);

      doc.featArtistNames[trackFeatArtistIndex] = payload.name;
    });

    await this._client
      .collections(this._collectionName)
      .documents()
      .import(docs, { action: 'upsert' });
  }

  async deleteByArtistId(artistId: string) {
    await this._client
      .collections('tracks')
      .documents()
      .delete({
        filter_by: `artistIds:=[${artistId}]`,
      });
  }

  async deleteByAlbumId(albumId: string) {
    await this._client
      .collections(this._collectionName)
      .documents()
      .delete({
        filter_by: `albumId:=${albumId}`,
      });
  }
}
