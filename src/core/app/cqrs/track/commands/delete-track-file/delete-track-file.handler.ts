import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteTrackFileCommand } from './delete-track-file.command';
import { TrackService } from '../../../../components/track/track.service';

@CommandHandler(DeleteTrackFileCommand)
export class DeleteTrackFileHandler implements ICommandHandler<DeleteTrackFileCommand> {
  constructor(@Inject(TrackService) private readonly _trackService: TrackService) {}

  async execute({ id }: DeleteTrackFileCommand) {
    return await this._trackService.deleteTrackFile(id);
  }
}
