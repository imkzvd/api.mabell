import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AlbumService } from '@core/app/components/album/album.service';
import { DeleteAlbumCommand } from '@core/app/cqrs/album/commands/delete-album/delete-album.command';
import { DeleteAlbumHandler as CoreDeleteAlbumHandler } from '@core/app/cqrs/album/commands/delete-album/delete-album.handler';

@CommandHandler(DeleteAlbumCommand)
export class DeleteAlbumHandler implements ICommandHandler<DeleteAlbumCommand> {
  private readonly _coreHandler: CoreDeleteAlbumHandler;

  constructor(@Inject(AlbumService) readonly service: AlbumService) {
    this._coreHandler = new CoreDeleteAlbumHandler(service);
  }

  execute(command: DeleteAlbumCommand) {
    return this._coreHandler.execute(command);
  }
}
