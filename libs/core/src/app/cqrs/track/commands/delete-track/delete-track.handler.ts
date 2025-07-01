import { CommandHandler } from '@core/app/types';
import { TrackService } from '@core/app/components/track/track.service';
import { DeleteTrackCommand } from '@core/app/cqrs/track/commands/delete-track/delete-track.command';

export class DeleteTrackHandler implements CommandHandler<DeleteTrackCommand> {
  constructor(private readonly _trackService: TrackService) {}

  async execute({ id }: DeleteTrackCommand) {
    return await this._trackService.deleteTrack(id);
  }
}
