import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../../../domain/components/album/repository/album-write-repository.port';
import { NotFoundException } from '../../../../../shared/exceptions';
import { CreateTrackCommand } from './create-track.command';
import {
  TRACK_WRITE_REPOSITORY_DI_TOKEN,
  TrackWriteRepository,
} from '../../../../../domain/components/track/repository/track-write-repository.port';
import { TrackFactory } from '../../../../../domain/components/track/track.factory';

@CommandHandler(CreateTrackCommand)
export class CreateTrackHandler implements ICommandHandler<CreateTrackCommand> {
  constructor(
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _albumWriteRepository: AlbumWriteRepository,
    @Inject(TRACK_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _trackWriteRepository: TrackWriteRepository,
  ) {}

  async execute({ albumId, name }: CreateTrackCommand) {
    const foundAlbum = await this._albumWriteRepository.findById(albumId);

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    const generatedId = this._trackWriteRepository.generateId();
    const nextTrackIndex = foundAlbum.getTracksTotal() + 1;
    const createdTrack = TrackFactory.create({
      id: generatedId,
      name: name || `Track #${nextTrackIndex}`,
      album: foundAlbum.getId(),
      artists: foundAlbum.getArtists(),
    });

    foundAlbum.addTrack(createdTrack.getId());
    await this._trackWriteRepository.save(createdTrack);
    await this._albumWriteRepository.save(foundAlbum);

    return {
      id: createdTrack.getId(),
    };
  }
}
