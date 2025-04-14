import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { UpdateTrackCommand } from './update-track.command';
import {
  TRACK_WRITE_REPOSITORY_DI_TOKEN,
  TrackWriteRepository,
} from '../../../../../domain/components/track/repository/track-write-repository.port';

@CommandHandler(UpdateTrackCommand)
export class UpdateTrackHandler implements ICommandHandler<UpdateTrackCommand> {
  constructor(
    @Inject(TRACK_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _trackWriteRepository: TrackWriteRepository,
  ) {}

  async execute({ id, payload }: UpdateTrackCommand) {
    const foundTrack = await this._trackWriteRepository.findById(id);

    if (!foundTrack) {
      throw new NotFoundException(`There is no track with the specified ID`);
    }

    if (payload.name) {
      foundTrack.updateName(payload.name);
    }

    if (typeof payload.isExplicit === 'boolean') {
      foundTrack.updateExplicitStatus(payload.isExplicit);
    }

    if (typeof payload.isActive === 'boolean') {
      foundTrack.updateActiveStatus(payload.isActive);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundTrack.updatePublicStatus(payload.isPublic);
    }

    return this._trackWriteRepository.save(foundTrack);
  }
}
