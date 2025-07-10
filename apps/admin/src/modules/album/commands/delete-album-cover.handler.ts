import { CommandHandler } from '@nestjs/cqrs';
import { DeleteAlbumCoverCommand } from '@core/app/cqrs/album/commands/delete-album-cover/delete-album-cover.command';
import { DeleteAlbumCoverHandler as CoreDeleteAlbumCoverHandler } from '@core/app/cqrs/album/commands/delete-album-cover/delete-album-cover.handler';
import { AlbumUpdateService } from '@core/app/components/album/services/album-update.service';

@CommandHandler(DeleteAlbumCoverCommand)
export class DeleteAlbumCoverHandler extends CoreDeleteAlbumCoverHandler {
  constructor(service: AlbumUpdateService) {
    super(service);
  }
}
