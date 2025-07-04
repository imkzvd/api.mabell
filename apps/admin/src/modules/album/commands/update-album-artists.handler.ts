import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { AlbumService } from '@core/app/components/album/album.service';
import { UpdateAlbumArtistsCommand } from '@core/app/cqrs/album/commands/update-album-artists/update-album-artists.command';
import { UpdateAlbumArtistsHandler as CoreUpdateAlbumArtistsHandler } from '@core/app/cqrs/album/commands/update-album-artists/update-album-artists.handler';
import { ArtistService } from '@core/app/components/artist/artist.service';

@CommandHandler(UpdateAlbumArtistsCommand)
export class UpdateAlbumArtistsHandler extends CoreUpdateAlbumArtistsHandler {
  constructor(
    @Inject(ArtistService) readonly artistService: ArtistService,
    @Inject(AlbumService) readonly albumService: AlbumService,
  ) {
    super(artistService, albumService);
  }
}
