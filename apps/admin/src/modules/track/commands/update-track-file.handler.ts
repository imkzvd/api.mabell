import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TrackService } from '@core/app/components/track/track.service';
import { UpdateTrackFileCommand } from '@core/app/cqrs/track/commands/update-track-file/update-track-file.command';
import { UpdateTrackFileHandler as CoreUpdateTrackFileHandler } from '@core/app/cqrs/track/commands/update-track-file/update-track-file.handler';

@CommandHandler(UpdateTrackFileCommand)
export class UpdateTrackFileHandler implements ICommandHandler<UpdateTrackFileCommand> {
  private readonly _coreHandler: CoreUpdateTrackFileHandler;

  constructor(@Inject(TrackService) readonly service: TrackService) {
    this._coreHandler = new CoreUpdateTrackFileHandler(service);
  }

  execute(command: UpdateTrackFileCommand) {
    return this._coreHandler.execute(command);
  }
}
