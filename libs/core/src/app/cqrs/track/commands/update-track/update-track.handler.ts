import { CommandHandler } from '../../../../types';
import { UpdateTrackCommand } from './update-track.command';
import { TrackUpdateService } from '../../../../components/track';

export class UpdateTrackHandler implements CommandHandler<UpdateTrackCommand> {
  constructor(private readonly _service: TrackUpdateService) {}

  async execute({ id, payload }: UpdateTrackCommand) {
    await this._service.updateById(id, payload);
  }
}
