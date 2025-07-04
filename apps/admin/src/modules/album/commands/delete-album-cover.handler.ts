import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { AlbumService } from '@core/app/components/album/album.service';
import { DeleteAlbumCoverCommand } from '@core/app/cqrs/album/commands/delete-album-cover/delete-album-cover.command';
import { DeleteAlbumCoverHandler as CoreDeleteAlbumCoverHandler } from '@core/app/cqrs/album/commands/delete-album-cover/delete-album-cover.handler';

@CommandHandler(DeleteAlbumCoverCommand)
export class DeleteAlbumCoverHandler extends CoreDeleteAlbumCoverHandler {
  constructor(@Inject(AlbumService) readonly service: AlbumService) {
    super(service);
  }
}
