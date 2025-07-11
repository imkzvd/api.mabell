import { CommandHandler } from '@core/app/types';
import { DeleteTrackFileCommand } from '@core/app/cqrs/track/commands/delete-track-file/delete-track-file.command';
import { TrackUpdateService } from '@core/app/components/track/services/track-update.service';

export class DeleteTrackFileHandler implements CommandHandler<DeleteTrackFileCommand> {
  constructor(private readonly _service: TrackUpdateService) {}

  async execute({ id }: DeleteTrackFileCommand) {
    return await this._service.deleteFile(id);
  }
}
