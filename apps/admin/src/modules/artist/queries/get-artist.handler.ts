import { QueryHandler } from '@nestjs/cqrs';
import { GetArtistQuery } from '@core/app/cqrs/artist/queries/get-artist/get-artist.query';
import { GetArtistHandler as CoreGetArtistHandler } from '@core/app/cqrs/artist/queries/get-artist/get-artist.handler';
import { ArtistService } from '@core/app/components/artist/services/artist.service';

@QueryHandler(GetArtistQuery)
export class GetArtistHandler extends CoreGetArtistHandler {
  constructor(service: ArtistService) {
    super(service);
  }
}
