import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTrackCommand } from './update-track.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { TrackUpdatedEvent } from '../../../../common/events/track-updated.event';
import { TrackService } from '../../../../components/track/track.service';

@CommandHandler(UpdateTrackCommand)
export class UpdateTrackHandler implements ICommandHandler<UpdateTrackCommand> {
  constructor(
    @Inject(TrackService) private readonly _trackService: TrackService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdateTrackCommand) {
    const updatedTrackId = await this._trackService.updateTrack(id, payload);

    this._eb.publish(new TrackUpdatedEvent({ id: updatedTrackId }));

    return updatedTrackId;
  }
}
