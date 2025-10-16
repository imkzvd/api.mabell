import { App } from '@api.mabell/core';
import { Artist } from './artist.document';
import ArtistMapper from './artist.mapper';
import { ArtistPayload } from './types';
import { BaseCollection } from '../../base/base-collection.abstract';

export class ArtistCollection extends BaseCollection<
  Artist,
  App.DTOs.IndexedArtistDTO,
  ArtistPayload
> {
  constructor() {
    const collectionName = 'artists';

    super(
      collectionName,
      {
        name: collectionName,
        fields: [
          { name: 'id', type: 'string', index: false },
          { name: 'name', type: 'string', index: true },
          { name: 'avatar', type: 'string', optional: true, index: false },
          { name: 'isGlobal', type: 'bool', index: true },
        ],
      },
      ArtistMapper,
    );
  }

  findByQuery(
    q: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ) {
    return this.search({
      q,
      query_by: 'name',
      ...(Boolean(options?.isGlobal) && {
        filter_by: `isGlobal:=${options?.isGlobal}`,
      }),
    });
  }
}
