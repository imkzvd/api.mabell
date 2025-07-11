import { CommandHandler } from '@nestjs/cqrs';
import { UpdateAlbumArtistsCommand } from '@core/app/cqrs/album/commands/update-album-artists/update-album-artists.command';
import { UpdateAlbumArtistsHandler as CoreUpdateAlbumArtistsHandler } from '@core/app/cqrs/album/commands/update-album-artists/update-album-artists.handler';
import { ArtistVerifyService } from '@core/app/components/artist/services/artist-verify.service';
import { AlbumUpdateService } from '@core/app/components/album/services/album-update.service';

@CommandHandler(UpdateAlbumArtistsCommand)
export class UpdateAlbumArtistsHandler extends CoreUpdateAlbumArtistsHandler {
  constructor(artistVerifyService: ArtistVerifyService, albumUpdateService: AlbumUpdateService) {
    super(artistVerifyService, albumUpdateService);
  }
}
