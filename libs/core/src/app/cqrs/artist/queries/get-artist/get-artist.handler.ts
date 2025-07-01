import { QueryHandler } from '@core/app/types';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { GetArtistQuery } from '@core/app/cqrs/artist/queries/get-artist/get-artist.query';
import ArtistMapper from '@core/app/components/artist/dtos/artist.mapper';

export class GetArtistHandler implements QueryHandler<GetArtistQuery> {
  constructor(private readonly _artistService: ArtistService) {}

  async execute({ id, options }: GetArtistQuery) {
    const foundArtist = await this._artistService.getArtist(id, options);

    return foundArtist ? ArtistMapper.toDTO(foundArtist) : null;
  }
}
