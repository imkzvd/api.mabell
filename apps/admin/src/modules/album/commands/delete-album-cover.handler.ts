import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AlbumService } from '@core/app/components/album/album.service';
import { DeleteAlbumCoverCommand } from '@core/app/cqrs/album/commands/delete-album-cover/delete-album-cover.command';
import { DeleteAlbumCoverHandler as CoreDeleteAlbumCoverHandler } from '@core/app/cqrs/album/commands/delete-album-cover/delete-album-cover.handler';

@CommandHandler(DeleteAlbumCoverCommand)
export class DeleteAlbumCoverHandler implements ICommandHandler<DeleteAlbumCoverCommand> {
  private readonly _coreHandler: CoreDeleteAlbumCoverHandler;

  constructor(@Inject(AlbumService) readonly service: AlbumService) {
    this._coreHandler = new CoreDeleteAlbumCoverHandler(service);
  }

  execute(command: DeleteAlbumCoverCommand) {
    return this._coreHandler.execute(command);
  }
}
