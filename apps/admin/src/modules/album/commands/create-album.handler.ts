import { CommandHandler } from '@nestjs/cqrs';
import { CreateAlbumCommand } from '@core/app/cqrs/album/commands/create-album/create-album.command';
import { CreateAlbumHandler as CoreCreateAlbumHandler } from '@core/app/cqrs/album/commands/create-album/create-album.handler';
import { ArtistVerifyService } from '@core/app/components/artist/services/artist-verify.service';
import { AlbumCreateService } from '@core/app/components/album/services/album-create.service';

@CommandHandler(CreateAlbumCommand)
export class CreateAlbumHandler extends CoreCreateAlbumHandler {
  constructor(artistVerifyService: ArtistVerifyService, albumCreateService: AlbumCreateService) {
    super(artistVerifyService, albumCreateService);
  }
}
