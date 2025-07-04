import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { AlbumService } from '@core/app/components/album/album.service';
import { DeleteAlbumCommand } from '@core/app/cqrs/album/commands/delete-album/delete-album.command';
import { DeleteAlbumHandler as CoreDeleteAlbumHandler } from '@core/app/cqrs/album/commands/delete-album/delete-album.handler';

@CommandHandler(DeleteAlbumCommand)
export class DeleteAlbumHandler extends CoreDeleteAlbumHandler {
  constructor(@Inject(AlbumService) readonly service: AlbumService) {
    super(service);
  }
}
