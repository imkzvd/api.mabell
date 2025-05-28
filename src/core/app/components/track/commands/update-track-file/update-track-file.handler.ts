import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTrackFileCommand } from './update-track-file.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { TrackService } from '../../track.service';
import { TrackUpdatedEvent } from '../../../../common/events/track-updated.event';

@CommandHandler(UpdateTrackFileCommand)
export class UpdateTrackFileHandler implements ICommandHandler<UpdateTrackFileCommand> {
  constructor(
    @Inject(TrackService) private readonly _trackService: TrackService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdateTrackFileCommand) {
    const updatedTrackId = await this._trackService.updateTrackFile(id, payload);

    this._eb.publish(new TrackUpdatedEvent({ id: updatedTrackId }));

    return updatedTrackId;
  }
}
