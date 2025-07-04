import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { TrackService } from '@core/app/components/track/track.service';
import { UpdateTrackFileCommand } from '@core/app/cqrs/track/commands/update-track-file/update-track-file.command';
import { UpdateTrackFileHandler as CoreUpdateTrackFileHandler } from '@core/app/cqrs/track/commands/update-track-file/update-track-file.handler';

@CommandHandler(UpdateTrackFileCommand)
export class UpdateTrackFileHandler extends CoreUpdateTrackFileHandler {
  constructor(@Inject(TrackService) readonly service: TrackService) {
    super(service);
  }
}
