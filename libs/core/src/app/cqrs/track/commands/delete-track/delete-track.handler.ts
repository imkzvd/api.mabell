import { CommandHandler } from '@core/app/types';
import { DeleteTrackCommand } from '@core/app/cqrs/track/commands/delete-track/delete-track.command';
import { TrackDeleteService } from '@core/app/components/track/services/track-delete.service';

export class DeleteTrackHandler implements CommandHandler<DeleteTrackCommand> {
  constructor(private readonly _service: TrackDeleteService) {}

  async execute({ id }: DeleteTrackCommand) {
    return await this._service.delete(id);
  }
}
