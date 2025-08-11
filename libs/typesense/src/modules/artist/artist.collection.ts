import { IndexedArtistDTO } from '@api.mabell/core';
import { Artist } from './artist.document';
import ArtistMapper from './artist.mapper';
import { ArtistPayload } from './types';
import { BaseCollection } from '../../base/base-collection.abstract';

export class ArtistCollection extends BaseCollection<Artist, IndexedArtistDTO, ArtistPayload> {
  constructor() {
    super(
      'artists',
      {
        name: 'artists',
        fields: [
          { name: 'id', type: 'string', index: false },
          { name: 'name', type: 'string' },
          { name: 'avatar', type: 'string', optional: true, index: false },
          { name: 'isGlobal', type: 'bool' },
        ],
      },
      ArtistMapper,
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
}
