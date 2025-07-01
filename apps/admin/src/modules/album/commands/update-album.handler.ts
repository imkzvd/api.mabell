import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AlbumService } from '@core/app/components/album/album.service';
import { UpdateAlbumCommand } from '@core/app/cqrs/album/commands/update-album/update-album.command';
import { UpdateAlbumHandler as CoreUpdateAlbumHandler } from '@core/app/cqrs/album/commands/update-album/update-album.handler';

@CommandHandler(UpdateAlbumCommand)
export class UpdateAlbumHandler implements ICommandHandler<UpdateAlbumCommand> {
  private readonly _coreHandler: CoreUpdateAlbumHandler;

  constructor(@Inject(AlbumService) readonly service: AlbumService) {
    this._coreHandler = new CoreUpdateAlbumHandler(service);
  }

  execute(command: UpdateAlbumCommand) {
    return this._coreHandler.execute(command);
  }
}
