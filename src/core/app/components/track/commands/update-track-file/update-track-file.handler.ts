import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../../artist/ports/storage/artist-file-storage.port';
import { UpdateTrackFileCommand } from './update-track-file.command';
import {
  TRACK_WRITE_REPOSITORY_DI_TOKEN,
  TrackWriteRepository,
} from '../../../../../domain/components/track/repository/track-write-repository.port';

@CommandHandler(UpdateTrackFileCommand)
export class UpdateTrackFileHandler implements ICommandHandler<UpdateTrackFileCommand> {
  constructor(
    @Inject(TRACK_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _trackWriteRepository: TrackWriteRepository,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id, payload }: UpdateTrackFileCommand) {
    const foundTrack = await this._trackWriteRepository.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    const storedFileData = await this._artistFileStorage.saveTrack(
      foundTrack.getMainArtist(),
      foundTrack.getAlbum(),
      foundTrack.getId(),
      payload.fileId,
    );

    foundTrack.updateFile(storedFileData.path);
    foundTrack.updateDuration(payload.duration);

    return this._trackWriteRepository.save(foundTrack);
  }
}
