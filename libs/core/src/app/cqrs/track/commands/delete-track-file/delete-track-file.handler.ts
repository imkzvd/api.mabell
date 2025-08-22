import { CommandHandler } from '../../../../types';
import { DeleteTrackFileCommand } from './delete-track-file.command';
import { TrackUpdateService } from '../../../../components/track';

export class DeleteTrackFileHandler implements CommandHandler<DeleteTrackFileCommand> {
  constructor(private readonly _service: TrackUpdateService) {}

  async execute({ id }: DeleteTrackFileCommand) {
    await this._service.deleteFileById(id);
  }
}
