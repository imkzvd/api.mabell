import { CommandHandler } from '@core/app/types';
import { TrackService } from '@core/app/components/track/track.service';
import { UpdateTrackFileCommand } from '@core/app/cqrs/track/commands/update-track-file/update-track-file.command';

export class UpdateTrackFileHandler implements CommandHandler<UpdateTrackFileCommand> {
  constructor(private readonly _trackService: TrackService) {}

  async execute({ id, payload }: UpdateTrackFileCommand) {
    return await this._trackService.updateTrackFile(id, payload);
  }
}
