import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { UpdatePlaylistCoverCommand } from '@core/app/cqrs/playlist/commands/update-playlist-cover/update-playlist-cover.command';
import { UpdatePlaylistCoverHandler as CoreUpdatePlaylistCoverHandler } from '@core/app/cqrs/playlist/commands/update-playlist-cover/update-playlist-cover.handler';

@CommandHandler(UpdatePlaylistCoverCommand)
export class UpdatePlaylistCoverHandler implements ICommandHandler<UpdatePlaylistCoverCommand> {
  private readonly _coreHandler: CoreUpdatePlaylistCoverHandler;

  constructor(@Inject(PlaylistService) readonly service: PlaylistService) {
    this._coreHandler = new CoreUpdatePlaylistCoverHandler(service);
  }

  execute(command: UpdatePlaylistCoverCommand) {
    return this._coreHandler.execute(command);
  }
}
