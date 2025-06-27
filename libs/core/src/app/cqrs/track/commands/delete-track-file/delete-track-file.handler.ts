import { CommandHandler } from '@core/app/types';
import { TrackService } from '@core/app/components/track/track.service';
import { DeleteTrackFileCommand } from '@core/app/cqrs/track/commands/delete-track-file/delete-track-file.command';

export class DeleteTrackFileHandler implements CommandHandler<DeleteTrackFileCommand> {
  constructor(private readonly _trackService: TrackService) {}

  async execute({ id }: DeleteTrackFileCommand) {
    return await this._trackService.deleteTrackFile(id);
  }
}
