import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateAlbumCommand } from '@core/app/cqrs/album/commands/create-album/create-album.command';
import { CreateAlbumHandler as CoreCreateAlbumHandler } from '@core/app/cqrs/album/commands/create-album/create-album.handler';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { AlbumService } from '@core/app/components/album/album.service';

@CommandHandler(CreateAlbumCommand)
export class CreateAlbumHandler extends CoreCreateAlbumHandler {
  constructor(
    @Inject(ArtistService) readonly artistService: ArtistService,
    @Inject(AlbumService) readonly albumService: AlbumService,
  ) {
    super(artistService, albumService);
  }
}
