import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteTrackCommand } from './delete-track.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { TrackService } from '../../track.service';
import { TrackDeletedEvent } from '../../../../common/events/track-deleted.event';

@CommandHandler(DeleteTrackCommand)
export class DeleteTrackHandler implements ICommandHandler<DeleteTrackCommand> {
  constructor(
    @Inject(TrackService) private readonly _trackService: TrackService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: DeleteTrackCommand) {
    const deletedTrackId = await this._trackService.deleteTrack(id);

    this._eb.publish(new TrackDeletedEvent({ id: deletedTrackId }));

    return deletedTrackId;
  }
}
