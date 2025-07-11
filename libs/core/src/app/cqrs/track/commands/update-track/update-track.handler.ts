import { CommandHandler } from '@core/app/types';
import { UpdateTrackCommand } from '@core/app/cqrs/track/commands/update-track/update-track.command';
import { TrackUpdateService } from '@core/app/components/track/services/track-update.service';

export class UpdateTrackHandler implements CommandHandler<UpdateTrackCommand> {
  constructor(private readonly _service: TrackUpdateService) {}

  async execute({ id, payload }: UpdateTrackCommand) {
    return await this._service.update(id, payload);
  }
}
