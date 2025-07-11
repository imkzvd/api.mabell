import { CommandHandler } from '@nestjs/cqrs';
import { UpdateTrackCommand } from '@core/app/cqrs/track/commands/update-track/update-track.command';
import { UpdateTrackHandler as CoreUpdateTrackHandler } from '@core/app/cqrs/track/commands/update-track/update-track.handler';
import { TrackUpdateService } from '@core/app/components/track/services/track-update.service';

@CommandHandler(UpdateTrackCommand)
export class UpdateTrackHandler extends CoreUpdateTrackHandler {
  constructor(service: TrackUpdateService) {
    super(service);
  }
}
