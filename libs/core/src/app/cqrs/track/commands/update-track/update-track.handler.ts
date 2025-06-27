import { CommandHandler } from '@core/app/types';
import { TrackService } from '@core/app/components/track/track.service';
import { UpdateTrackCommand } from '@core/app/cqrs/track/commands/update-track/update-track.command';

export class UpdateTrackHandler implements CommandHandler<UpdateTrackCommand> {
  constructor(private readonly _trackService: TrackService) {}

  async execute({ id, payload }: UpdateTrackCommand) {
    return await this._trackService.updateTrack(id, payload);
  }
}
