import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { DeletePlaylistCoverCommand } from './delete-playlist-cover.command';
import {
  PLAYLIST_WRITE_REPOSITORY_DI_TOKEN,
  PlaylistWriteRepository,
} from '../../../../../domain/components/playlist/repository/playlist-write-repository.port';
import {
  USER_FILE_STORAGE_DI_TOKEN,
  UserFileStorage,
} from '../../../user/ports/storage/user-file-storage.port';

@CommandHandler(DeletePlaylistCoverCommand)
export class DeletePlaylistCoverHandler implements ICommandHandler<DeletePlaylistCoverCommand> {
  constructor(
    @Inject(PLAYLIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _playlistWriteRepository: PlaylistWriteRepository,
    @Inject(USER_FILE_STORAGE_DI_TOKEN)
    private readonly _userFileStorage: UserFileStorage,
  ) {}

  async execute({ id }: DeletePlaylistCoverCommand) {
    const foundPlaylist = await this._playlistWriteRepository.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    foundPlaylist.deleteCover();
    foundPlaylist.deleteColor();

    await this._playlistWriteRepository.save(foundPlaylist);

    return this._userFileStorage.deletePlaylistCover(
      foundPlaylist.getOwner(),
      foundPlaylist.getId(),
    );
  }
}
