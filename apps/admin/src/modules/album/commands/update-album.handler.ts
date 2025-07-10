import { CommandHandler } from '@nestjs/cqrs';
import { UpdateAlbumCommand } from '@core/app/cqrs/album/commands/update-album/update-album.command';
import { UpdateAlbumHandler as CoreUpdateAlbumHandler } from '@core/app/cqrs/album/commands/update-album/update-album.handler';
import { AlbumUpdateService } from '@core/app/components/album/services/album-update.service';

@CommandHandler(UpdateAlbumCommand)
export class UpdateAlbumHandler extends CoreUpdateAlbumHandler {
  constructor(service: AlbumUpdateService) {
    super(service);
  }
}
