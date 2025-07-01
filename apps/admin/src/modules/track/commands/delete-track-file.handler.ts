import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TrackService } from '@core/app/components/track/track.service';
import { DeleteTrackFileCommand } from '@core/app/cqrs/track/commands/delete-track-file/delete-track-file.command';
import { DeleteTrackFileHandler as CoreDeleteTrackFileHandler } from '@core/app/cqrs/track/commands/delete-track-file/delete-track-file.handler';

@CommandHandler(DeleteTrackFileCommand)
export class DeleteTrackFileHandler implements ICommandHandler<DeleteTrackFileCommand> {
  private readonly _coreHandler: CoreDeleteTrackFileHandler;

  constructor(@Inject(TrackService) readonly service: TrackService) {
    this._coreHandler = new CoreDeleteTrackFileHandler(service);
  }

  execute(command: DeleteTrackFileCommand) {
    return this._coreHandler.execute(command);
  }
}
