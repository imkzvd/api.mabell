import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { DeletePlaylistCommand } from './delete-playlist.command';
import {
  PLAYLIST_WRITE_REPOSITORY_DI_TOKEN,
  PlaylistWriteRepository,
} from '../../../../../domain/components/playlist/repository/playlist-write-repository.port';
import {
  USER_FILE_STORAGE_DI_TOKEN,
  UserFileStorage,
} from '../../../user/ports/storage/user-file-storage.port';

@CommandHandler(DeletePlaylistCommand)
export class DeletePlaylistHandler implements ICommandHandler<DeletePlaylistCommand> {
  constructor(
    @Inject(PLAYLIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _playlistWriteRepository: PlaylistWriteRepository,
    @Inject(USER_FILE_STORAGE_DI_TOKEN)
    private readonly _userFileStorage: UserFileStorage,
  ) {}

  async execute({ id }: DeletePlaylistCommand) {
    const foundPlaylist = await this._playlistWriteRepository.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Album does not exist');
    }

    await this._playlistWriteRepository.deleteById(id);

    return this._userFileStorage.deletePlaylistDirectory(
      foundPlaylist.getOwner(),
      foundPlaylist.getId(),
    );
  }
}
