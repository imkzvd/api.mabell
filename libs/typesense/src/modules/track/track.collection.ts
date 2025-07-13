import { IndexedTrackDTO } from '@core/app/common/ports/search-service/dtos/indexed-track.dto';
import { BaseCollection } from '@infrastructure/typesense/base/base-collection.abstract';
import { TrackPayload } from '@infrastructure/typesense/modules/track/types';
import { ArtistPayload } from '@infrastructure/typesense/modules/artist/types';
import { AlbumPayload } from '@infrastructure/typesense/modules/album/types';
import { Track } from '@infrastructure/typesense/modules/track/track.document';
import TrackMapper from '@infrastructure/typesense/modules/track/track.mapper';

export class TrackCollection extends BaseCollection<Track, IndexedTrackDTO, TrackPayload> {
  constructor() {
    super(
      'tracks',
      {
        name: 'tracks',
        fields: [
          { name: 'id', type: 'string', index: false },
          { name: 'name', type: 'string' },
          { name: 'albumId', type: 'string' },
          { name: 'albumName', type: 'string' },
          { name: 'artistIds', type: 'string[]' },
          { name: 'artistNames', type: 'string[]' },
          { name: 'featArtistIds', type: 'string[]' },
          { name: 'featArtistNames', type: 'string[]' },
          { name: 'isExplicit', type: 'bool', index: false },
          { name: 'cover', type: 'string', optional: true, index: false },
          { name: 'isGlobal', type: 'bool' },
        ],
      },
      TrackMapper,
    );
  }

  async find(q: string, isGlobal?: boolean) {
    const { items } = await this.search({
      q,
      query_by: 'name,albumName,artistNames,featArtistNames',
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
    });

    await this._client.collections('tracks').documents().import(docs, { action: 'upsert' });
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

    await this._client.collections('tracks').documents().import(docs, { action: 'upsert' });
  }
}
