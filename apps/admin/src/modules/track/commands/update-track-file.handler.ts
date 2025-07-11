import { CommandHandler } from '@nestjs/cqrs';
import { UpdateTrackFileCommand } from '@core/app/cqrs/track/commands/update-track-file/update-track-file.command';
import { UpdateTrackFileHandler as CoreUpdateTrackFileHandler } from '@core/app/cqrs/track/commands/update-track-file/update-track-file.handler';
import { TrackUpdateService } from '@core/app/components/track/services/track-update.service';

@CommandHandler(UpdateTrackFileCommand)
export class UpdateTrackFileHandler extends CoreUpdateTrackFileHandler {
  constructor(service: TrackUpdateService) {
    super(service);
  }
}
