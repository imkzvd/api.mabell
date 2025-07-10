import { QueryHandler } from '@core/app/types';
import { GetArtistQuery } from '@core/app/cqrs/artist/queries/get-artist/get-artist.query';
import ArtistMapper from '@core/app/components/artist/dtos/artist.mapper';
import { ArtistService } from '@core/app/components/artist/services/artist.service';

export class GetArtistHandler implements QueryHandler<GetArtistQuery> {
  constructor(private readonly _service: ArtistService) {}

  async execute({ id, options }: GetArtistQuery) {
    const foundArtist = await this._service.find(id, options);

    return foundArtist ? ArtistMapper.toDTO(foundArtist) : null;
  }
}
