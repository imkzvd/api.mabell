import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTrackFileCommand } from './update-track-file.command';
import { TrackService } from '../../../../components/track/track.service';

@CommandHandler(UpdateTrackFileCommand)
export class UpdateTrackFileHandler implements ICommandHandler<UpdateTrackFileCommand> {
  constructor(@Inject(TrackService) private readonly _trackService: TrackService) {}

  async execute({ id, payload }: UpdateTrackFileCommand) {
    return await this._trackService.updateTrackFile(id, payload);
  }
}
