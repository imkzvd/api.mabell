import { IndexedArtistDTO } from '@core/app/common/ports/search-service/dtos/indexed-artist.dto';
import { Artist } from '@infrastructure/typesense/modules/artist/artist.document';
import ArtistMapper from '@infrastructure/typesense/modules/artist/artist.mapper';
import { BaseCollection } from '@infrastructure/typesense/base/base-collection.abstract';
import { ArtistPayload } from '@infrastructure/typesense/modules/artist/types';
import { TypeSenseClient } from '@infrastructure/typesense/client';

export class ArtistCollection extends BaseCollection<Artist, IndexedArtistDTO, ArtistPayload> {
  constructor() {
    super(
      TypeSenseClient,
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
      'name',
    );
  }
}
