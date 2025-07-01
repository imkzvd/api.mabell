import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { UpdatePlaylistCommand } from '@core/app/cqrs/playlist/commands/update-playlist/update-playlist.command';
import { UpdatePlaylistHandler as CoreUpdatePlaylistHandler } from '@core/app/cqrs/playlist/commands/update-playlist/update-playlist.handler';

@CommandHandler(UpdatePlaylistCommand)
export class UpdatePlaylistHandler implements ICommandHandler<UpdatePlaylistCommand> {
  private readonly _coreHandler: CoreUpdatePlaylistHandler;

  constructor(@Inject(PlaylistService) readonly service: PlaylistService) {
    this._coreHandler = new CoreUpdatePlaylistHandler(service);
  }

  execute(command: UpdatePlaylistCommand) {
    return this._coreHandler.execute(command);
  }
}
