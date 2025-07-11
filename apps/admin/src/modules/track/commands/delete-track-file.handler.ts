import { CommandHandler } from '@nestjs/cqrs';
import { DeleteTrackFileCommand } from '@core/app/cqrs/track/commands/delete-track-file/delete-track-file.command';
import { DeleteTrackFileHandler as CoreDeleteTrackFileHandler } from '@core/app/cqrs/track/commands/delete-track-file/delete-track-file.handler';
import { TrackUpdateService } from '@core/app/components/track/services/track-update.service';

@CommandHandler(DeleteTrackFileCommand)
export class DeleteTrackFileHandler extends CoreDeleteTrackFileHandler {
  constructor(service: TrackUpdateService) {
    super(service);
  }
}
