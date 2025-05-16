import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../../artist/ports/storage/artist-file-storage.port';
import { DeleteTrackFileCommand } from './delete-track-file.command';
import {
  TRACK_WRITE_REPOSITORY_DI_TOKEN,
  TrackWriteRepository,
} from '../../../../../domain/components/track/repository/track-write-repository.port';

@CommandHandler(DeleteTrackFileCommand)
export class DeleteTrackFileHandler implements ICommandHandler<DeleteTrackFileCommand> {
  constructor(
    @Inject(TRACK_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _trackWriteRepository: TrackWriteRepository,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id }: DeleteTrackFileCommand) {
    const foundTrack = await this._trackWriteRepository.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    foundTrack.deleteFile();
    foundTrack.deleteDuration();
    foundTrack.updateActiveStatus(false);
    await this._trackWriteRepository.save(foundTrack);

    return this._artistFileStorage.deleteTrack(
      foundTrack.getMainArtist(),
      foundTrack.getAlbum(),
      foundTrack.getId(),
    );
  }
}
