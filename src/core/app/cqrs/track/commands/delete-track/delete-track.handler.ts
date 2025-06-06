import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteTrackCommand } from './delete-track.command';
import { TrackService } from '../../../../components/track/track.service';

@CommandHandler(DeleteTrackCommand)
export class DeleteTrackHandler implements ICommandHandler<DeleteTrackCommand> {
  constructor(@Inject(TrackService) private readonly _trackService: TrackService) {}

  async execute({ id }: DeleteTrackCommand) {
    return await this._trackService.deleteTrack(id);
  }
}
