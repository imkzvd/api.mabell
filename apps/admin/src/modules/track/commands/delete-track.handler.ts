import { CommandHandler } from '@nestjs/cqrs';
import { DeleteTrackCommand } from '@core/app/cqrs/track/commands/delete-track/delete-track.command';
import { DeleteTrackHandler as CoreDeleteTrackHandler } from '@core/app/cqrs/track/commands/delete-track/delete-track.handler';
import { TrackDeleteService } from '@core/app/components/track/services/track-delete.service';

@CommandHandler(DeleteTrackCommand)
export class DeleteTrackHandler extends CoreDeleteTrackHandler {
  constructor(service: TrackDeleteService) {
    super(service);
  }
}
