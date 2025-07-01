import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '@core/app/components/user/user.service';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { CreatePlaylistCommand } from '@core/app/cqrs/playlist/commands/create-playlist/create-playlist.command';
import { CreatePlaylistHandler as CoreCreatePlaylistHandler } from '@core/app/cqrs/playlist/commands/create-playlist/create-playlist.handler';

@CommandHandler(CreatePlaylistCommand)
export class CreatePlaylistHandler implements ICommandHandler<CreatePlaylistCommand> {
  private readonly _coreHandler: CoreCreatePlaylistHandler;

  constructor(
    @Inject(UserService) readonly userService: UserService,
    @Inject(PlaylistService) readonly playlistService: PlaylistService,
  ) {
    this._coreHandler = new CoreCreatePlaylistHandler(userService, playlistService);
  }

  execute(command: CreatePlaylistCommand) {
    return this._coreHandler.execute(command);
  }
}
