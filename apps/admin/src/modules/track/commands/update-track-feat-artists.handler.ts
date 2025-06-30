import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TrackService } from '@core/app/components/track/track.service';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { UpdateTrackFeatArtistsHandler as CoreUpdateTrackFeatArtistsHandler } from '@core/app/cqrs/track/commands/update-track-feat-artists/update-track-feat-artists.handler';
import { UpdateTrackFeatArtistsCommand } from '@core/app/cqrs/track/commands/update-track-feat-artists/update-track-feat-artists.command';

@CommandHandler(UpdateTrackFeatArtistsCommand)
export class UpdateTrackFeatArtistsHandler
  implements ICommandHandler<UpdateTrackFeatArtistsCommand>
{
  private readonly _coreHandler: CoreUpdateTrackFeatArtistsHandler;

  constructor(
    @Inject(ArtistService) readonly artistService: ArtistService,
    @Inject(TrackService) readonly trackService: TrackService,
  ) {
    this._coreHandler = new CoreUpdateTrackFeatArtistsHandler(artistService, trackService);
  }

  execute(command: UpdateTrackFeatArtistsCommand) {
    return this._coreHandler.execute(command);
  }
}
