import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { TrackService } from '@core/app/components/track/track.service';
import { DeleteTrackCommand } from '@core/app/cqrs/track/commands/delete-track/delete-track.command';
import { DeleteTrackHandler as CoreDeleteTrackHandler } from '@core/app/cqrs/track/commands/delete-track/delete-track.handler';

@CommandHandler(DeleteTrackCommand)
export class DeleteTrackHandler extends CoreDeleteTrackHandler {
  constructor(@Inject(TrackService) readonly service: TrackService) {
    super(service);
  }
}
