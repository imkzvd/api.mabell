import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { UpdatePlaylistCoverCommand } from './update-playlist-cover.command';
import {
  PLAYLIST_WRITE_REPOSITORY_DI_TOKEN,
  PlaylistWriteRepository,
} from '../../../../../domain/components/playlist/repository/playlist-write-repository.port';
import {
  USER_FILE_STORAGE_DI_TOKEN,
  UserFileStorage,
} from '../../../user/ports/storage/user-file-storage.port';

@CommandHandler(UpdatePlaylistCoverCommand)
export class UpdatePlaylistCoverHandler implements ICommandHandler<UpdatePlaylistCoverCommand> {
  constructor(
    @Inject(PLAYLIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _playlistWriteRepository: PlaylistWriteRepository,
    @Inject(USER_FILE_STORAGE_DI_TOKEN)
    private readonly _userFileStorage: UserFileStorage,
  ) {}

  async execute({ id, payload }: UpdatePlaylistCoverCommand) {
    const foundPlaylist = await this._playlistWriteRepository.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException('Playlist does not exist');
    }

    const storedFileData = await this._userFileStorage.savePlaylistCover(
      foundPlaylist.getOwner(),
      foundPlaylist.getId(),
      payload.fileId,
    );

    foundPlaylist.updateCover(storedFileData.path);

    if (payload.color !== undefined) {
      foundPlaylist.updateColor(payload.color);
    }

    return this._playlistWriteRepository.save(foundPlaylist);
  }
}
