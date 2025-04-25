import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { UpdatePlaylistCommand } from './update-playlist.command';
import {
  PLAYLIST_WRITE_REPOSITORY_DI_TOKEN,
  PlaylistWriteRepository,
} from '../../../../../domain/components/playlist/repository/playlist-write-repository.port';

@CommandHandler(UpdatePlaylistCommand)
export class UpdatePlaylistHandler implements ICommandHandler<UpdatePlaylistCommand> {
  constructor(
    @Inject(PLAYLIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _playlistWriteRepository: PlaylistWriteRepository,
  ) {}

  async execute({ id, payload }: UpdatePlaylistCommand) {
    const foundPlaylist = await this._playlistWriteRepository.findById(id);

    if (!foundPlaylist) {
      throw new NotFoundException(`There is no playlist with the specified ID`);
    }

    if (payload.name) {
      foundPlaylist.updateName(payload.name);
    }

    if (payload.genres) {
      foundPlaylist.updateGenres(payload.genres);
    }

    if (payload.description) {
      foundPlaylist.updateDescription(payload.description);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundPlaylist.updatePublicStatus(payload.isPublic);
    }

    return this._playlistWriteRepository.save(foundPlaylist);
  }
}
