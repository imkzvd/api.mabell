import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TrackService } from '@core/app/components/track/track.service';
import { UpdateTrackCommand } from '@core/app/cqrs/track/commands/update-track/update-track.command';
import { UpdateTrackHandler as CoreUpdateTrackHandler } from '@core/app/cqrs/track/commands/update-track/update-track.handler';

@CommandHandler(UpdateTrackCommand)
export class UpdateTrackHandler implements ICommandHandler<UpdateTrackCommand> {
  private readonly _coreHandler: CoreUpdateTrackHandler;

  constructor(@Inject(TrackService) readonly service: TrackService) {
    this._coreHandler = new CoreUpdateTrackHandler(service);
  }

  execute(command: UpdateTrackCommand) {
    return this._coreHandler.execute(command);
  }
}
