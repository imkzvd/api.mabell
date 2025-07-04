import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistQuery } from '@core/app/cqrs/artist/queries/get-artist/get-artist.query';
import { GetArtistHandler as CoreGetArtistHandler } from '@core/app/cqrs/artist/queries/get-artist/get-artist.handler';
import { ArtistService } from '@core/app/components/artist/artist.service';

@QueryHandler(GetArtistQuery)
export class GetArtistHandler extends CoreGetArtistHandler {
  constructor(@Inject(ArtistService) service: ArtistService) {
    super(service);
  }
}
