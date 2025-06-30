import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AlbumService } from '@core/app/components/album/album.service';
import { UpdateAlbumCoverCommand } from '@core/app/cqrs/album/commands/update-album-cover/update-album-cover.command';
import { UpdateAlbumCoverHandler as CoreUpdateAlbumCoverHandler } from '@core/app/cqrs/album/commands/update-album-cover/update-album-cover.handler';

@CommandHandler(UpdateAlbumCoverCommand)
export class UpdateAlbumCoverHandler implements ICommandHandler<UpdateAlbumCoverCommand> {
  private readonly _coreHandler: CoreUpdateAlbumCoverHandler;

  constructor(@Inject(AlbumService) readonly service: AlbumService) {
    this._coreHandler = new CoreUpdateAlbumCoverHandler(service);
  }

  execute(command: UpdateAlbumCoverCommand) {
    return this._coreHandler.execute(command);
  }
}
