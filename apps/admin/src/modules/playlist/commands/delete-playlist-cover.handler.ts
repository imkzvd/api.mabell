import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { DeletePlaylistCoverCommand } from '@core/app/cqrs/playlist/commands/delete-playlist-cover/delete-playlist-cover.command';
import { DeletePlaylistCoverHandler as CoreDeletePlaylistCoverHandler } from '@core/app/cqrs/playlist/commands/delete-playlist-cover/delete-playlist-cover.handler';

@CommandHandler(DeletePlaylistCoverCommand)
export class DeletePlaylistCoverHandler implements ICommandHandler<DeletePlaylistCoverCommand> {
  private readonly _coreHandler: CoreDeletePlaylistCoverHandler;

  constructor(@Inject(PlaylistService) readonly service: PlaylistService) {
    this._coreHandler = new CoreDeletePlaylistCoverHandler(service);
  }

  execute(command: DeletePlaylistCoverCommand) {
    return this._coreHandler.execute(command);
  }
}
