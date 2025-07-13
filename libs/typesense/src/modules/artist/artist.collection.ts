import { IndexedArtistDTO } from '@core/app/common/ports/search-service/dtos/indexed-artist.dto';
import { Artist } from '@infrastructure/typesense/modules/artist/artist.document';
import ArtistMapper from '@infrastructure/typesense/modules/artist/artist.mapper';
import { BaseCollection } from '@infrastructure/typesense/base/base-collection.abstract';
import { ArtistPayload } from '@infrastructure/typesense/modules/artist/types';

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
