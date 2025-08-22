import { CommandHandler } from '../../../../types';
import { UpdateTrackFileCommand } from './update-track-file.command';
import { TrackUpdateService } from '../../../../components/track';

export class UpdateTrackFileHandler implements CommandHandler<UpdateTrackFileCommand> {
  constructor(private readonly _service: TrackUpdateService) {}

  async execute({ id, payload }: UpdateTrackFileCommand) {
    await this._service.updateFileById(id, payload);
  }
}
