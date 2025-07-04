import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { AlbumService } from '@core/app/components/album/album.service';
import { UpdateAlbumCoverCommand } from '@core/app/cqrs/album/commands/update-album-cover/update-album-cover.command';
import { UpdateAlbumCoverHandler as CoreUpdateAlbumCoverHandler } from '@core/app/cqrs/album/commands/update-album-cover/update-album-cover.handler';

@CommandHandler(UpdateAlbumCoverCommand)
export class UpdateAlbumCoverHandler extends CoreUpdateAlbumCoverHandler {
  constructor(@Inject(AlbumService) readonly service: AlbumService) {
    super(service);
  }
}
