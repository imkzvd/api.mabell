import { CommandHandler } from '../../../../types';
import { DeleteTrackCommand } from './delete-track.command';
import { TrackDeleteService } from '../../../../components/track';

export class DeleteTrackHandler implements CommandHandler<DeleteTrackCommand> {
  constructor(private readonly _service: TrackDeleteService) {}

  async execute({ id }: DeleteTrackCommand) {
    await this._service.deleteById(id);
  }
}
