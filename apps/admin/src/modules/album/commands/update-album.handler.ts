import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { AlbumService } from '@core/app/components/album/album.service';
import { UpdateAlbumCommand } from '@core/app/cqrs/album/commands/update-album/update-album.command';
import { UpdateAlbumHandler as CoreUpdateAlbumHandler } from '@core/app/cqrs/album/commands/update-album/update-album.handler';

@CommandHandler(UpdateAlbumCommand)
export class UpdateAlbumHandler extends CoreUpdateAlbumHandler {
  constructor(@Inject(AlbumService) readonly service: AlbumService) {
    super(service);
  }
}
