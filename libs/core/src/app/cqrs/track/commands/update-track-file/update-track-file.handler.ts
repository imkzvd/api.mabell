import { CommandHandler } from '@core/app/types';
import { UpdateTrackFileCommand } from '@core/app/cqrs/track/commands/update-track-file/update-track-file.command';
import { TrackUpdateService } from '@core/app/components/track/services/track-update.service';

export class UpdateTrackFileHandler implements CommandHandler<UpdateTrackFileCommand> {
  constructor(private readonly _service: TrackUpdateService) {}

  async execute({ id, payload }: UpdateTrackFileCommand) {
    return await this._service.updateFile(id, payload);
  }
}
