import { CommandHandler } from '@nestjs/cqrs';
import { DeleteAlbumCommand } from '@core/app/cqrs/album/commands/delete-album/delete-album.command';
import { DeleteAlbumHandler as CoreDeleteAlbumHandler } from '@core/app/cqrs/album/commands/delete-album/delete-album.handler';
import { AlbumDeleteService } from '@core/app/components/album/services/album-delete.service';

@CommandHandler(DeleteAlbumCommand)
export class DeleteAlbumHandler extends CoreDeleteAlbumHandler {
  constructor(service: AlbumDeleteService) {
    super(service);
  }
}
