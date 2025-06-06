import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTrackCommand } from './update-track.command';
import { TrackService } from '../../../../components/track/track.service';

@CommandHandler(UpdateTrackCommand)
export class UpdateTrackHandler implements ICommandHandler<UpdateTrackCommand> {
  constructor(@Inject(TrackService) private readonly _trackService: TrackService) {}

  async execute({ id, payload }: UpdateTrackCommand) {
    return await this._trackService.updateTrack(id, payload);
  }
}
