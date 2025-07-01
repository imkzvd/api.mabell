import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetArtistQuery } from '@core/app/cqrs/artist/queries/get-artist/get-artist.query';
import { GetArtistHandler as CoreGetArtistHandler } from '@core/app/cqrs/artist/queries/get-artist/get-artist.handler';
import { ArtistService } from '@core/app/components/artist/artist.service';

@QueryHandler(GetArtistQuery)
export class GetArtistHandler implements IQueryHandler<GetArtistQuery> {
  private readonly _coreHandler: CoreGetArtistHandler;

  constructor(@Inject(ArtistService) readonly service: ArtistService) {
    this._coreHandler = new CoreGetArtistHandler(service);
  }

  async execute(query: GetArtistQuery) {
    return this._coreHandler.execute(query);
  }
}
