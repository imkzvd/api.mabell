import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { CreatePlaylistCommand } from './create-playlist.command';
import {
  PLAYLIST_WRITE_REPOSITORY_DI_TOKEN,
  PlaylistWriteRepository,
} from '../../../../../domain/components/playlist/repository/playlist-write-repository.port';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../../../domain/components/user/repository/user-write-repository.port';
import { PlaylistFactory } from '../../../../../domain/components/playlist/playlist.factory';

@CommandHandler(CreatePlaylistCommand)
export class CreatePlaylistHandler implements ICommandHandler<CreatePlaylistCommand> {
  constructor(
    @Inject(PLAYLIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _playlistWriteRepository: PlaylistWriteRepository,
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
  ) {}

  async execute({ ownerId }: CreatePlaylistCommand) {
    const existUserId = await this._userWriteRepository.existsById(ownerId);

    if (!existUserId) {
      throw new NotFoundException('User does not exist');
    }

    const generatedId = this._playlistWriteRepository.generateId();
    const createdPlaylist = PlaylistFactory.create({
      id: generatedId,
      owner: existUserId,
      name: 'Playlist',
    });

    await this._playlistWriteRepository.save(createdPlaylist);

    return {
      id: createdPlaylist.getId(),
    };
  }
}
