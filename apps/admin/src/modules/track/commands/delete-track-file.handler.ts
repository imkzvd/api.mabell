import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { TrackService } from '@core/app/components/track/track.service';
import { DeleteTrackFileCommand } from '@core/app/cqrs/track/commands/delete-track-file/delete-track-file.command';
import { DeleteTrackFileHandler as CoreDeleteTrackFileHandler } from '@core/app/cqrs/track/commands/delete-track-file/delete-track-file.handler';

@CommandHandler(DeleteTrackFileCommand)
export class DeleteTrackFileHandler extends CoreDeleteTrackFileHandler {
  constructor(@Inject(TrackService) readonly service: TrackService) {
    super(service);
  }
}
