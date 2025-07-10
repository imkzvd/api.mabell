import { CommandHandler } from '@nestjs/cqrs';
import { UpdateAlbumCoverCommand } from '@core/app/cqrs/album/commands/update-album-cover/update-album-cover.command';
import { UpdateAlbumCoverHandler as CoreUpdateAlbumCoverHandler } from '@core/app/cqrs/album/commands/update-album-cover/update-album-cover.handler';
import { AlbumUpdateService } from '@core/app/components/album/services/album-update.service';

@CommandHandler(UpdateAlbumCoverCommand)
export class UpdateAlbumCoverHandler extends CoreUpdateAlbumCoverHandler {
  constructor(service: AlbumUpdateService) {
    super(service);
  }
}
