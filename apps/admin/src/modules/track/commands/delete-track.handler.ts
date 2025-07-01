import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TrackService } from '@core/app/components/track/track.service';
import { DeleteTrackCommand } from '@core/app/cqrs/track/commands/delete-track/delete-track.command';
import { DeleteTrackHandler as CoreDeleteTrackHandler } from '@core/app/cqrs/track/commands/delete-track/delete-track.handler';

@CommandHandler(DeleteTrackCommand)
export class DeleteTrackHandler implements ICommandHandler<DeleteTrackCommand> {
  private readonly _coreHandler: CoreDeleteTrackHandler;

  constructor(@Inject(TrackService) readonly service: TrackService) {
    this._coreHandler = new CoreDeleteTrackHandler(service);
  }

  execute(command: DeleteTrackCommand) {
    return this._coreHandler.execute(command);
  }
}
