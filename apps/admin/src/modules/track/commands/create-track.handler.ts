import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AlbumService } from '@core/app/components/album/album.service';
import { CreateTrackCommand } from '@core/app/cqrs/track/commands/create-track/create-track.command';
import { CreateTrackHandler as CoreCreateTrackHandler } from '@core/app/cqrs/track/commands/create-track/create-track.handler';
import { TrackService } from '@core/app/components/track/track.service';

@CommandHandler(CreateTrackCommand)
export class CreateTrackHandler implements ICommandHandler<CreateTrackCommand> {
  private readonly _coreHandler: CoreCreateTrackHandler;

  constructor(
    @Inject(AlbumService) readonly albumService: AlbumService,
    @Inject(TrackService) readonly trackService: TrackService,
  ) {
    this._coreHandler = new CoreCreateTrackHandler(albumService, trackService);
  }

  execute(command: CreateTrackCommand) {
    return this._coreHandler.execute(command);
  }
}
