import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { TrackService } from '@core/app/components/track/track.service';
import { UpdateTrackCommand } from '@core/app/cqrs/track/commands/update-track/update-track.command';
import { UpdateTrackHandler as CoreUpdateTrackHandler } from '@core/app/cqrs/track/commands/update-track/update-track.handler';

@CommandHandler(UpdateTrackCommand)
export class UpdateTrackHandler extends CoreUpdateTrackHandler {
  constructor(@Inject(TrackService) readonly service: TrackService) {
    super(service);
  }
}
