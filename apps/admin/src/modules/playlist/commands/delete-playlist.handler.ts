import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { DeletePlaylistCommand } from '@core/app/cqrs/playlist/commands/delete-playlist/delete-playlist.command';
import { DeletePlaylistHandler as CoreDeletePlaylistHandler } from '@core/app/cqrs/playlist/commands/delete-playlist/delete-playlist.handler';

@CommandHandler(DeletePlaylistCommand)
export class DeletePlaylistHandler implements ICommandHandler<DeletePlaylistCommand> {
  private readonly _coreHandler: CoreDeletePlaylistHandler;

  constructor(@Inject(PlaylistService) readonly service: PlaylistService) {
    this._coreHandler = new CoreDeletePlaylistHandler(service);
  }

  execute(command: DeletePlaylistCommand) {
    return this._coreHandler.execute(command);
  }
}
