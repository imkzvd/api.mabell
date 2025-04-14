import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../../../domain/components/album/repository/album-write-repository.port';
import { NotFoundException } from '../../../../../shared/exceptions';
import {
  ARTIST_FILE_STORAGE_DI_TOKEN,
  ArtistFileStorage,
} from '../../../artist/ports/storage/artist-file-storage.port';
import { DeleteTrackCommand } from './delete-track.command';
import {
  TRACK_WRITE_REPOSITORY_DI_TOKEN,
  TrackWriteRepository,
} from '../../../../../domain/components/track/repository/track-write-repository.port';

@CommandHandler(DeleteTrackCommand)
export class DeleteTrackHandler implements ICommandHandler<DeleteTrackCommand> {
  constructor(
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _albumWriteRepository: AlbumWriteRepository,
    @Inject(TRACK_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _trackWriteRepository: TrackWriteRepository,
    @Inject(ARTIST_FILE_STORAGE_DI_TOKEN)
    private readonly _artistFileStorage: ArtistFileStorage,
  ) {}

  async execute({ id }: DeleteTrackCommand) {
    const foundTrack = await this._trackWriteRepository.findById(id);

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    const foundAlbum = await this._albumWriteRepository.findById(foundTrack.getAlbum());

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    const deleteTrackId = await this._trackWriteRepository.deleteById(id);

    if (!deleteTrackId) {
      throw new NotFoundException('Album does not exist');
    }

    foundAlbum.deleteTrack(deleteTrackId);
    await this._albumWriteRepository.save(foundAlbum);

    return this._artistFileStorage.deleteTrack(
      foundAlbum.getMainArtist(),
      foundAlbum.getId(),
      deleteTrackId,
    );
  }
}
