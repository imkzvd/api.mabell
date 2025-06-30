import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AlbumService } from '@core/app/components/album/album.service';
import { UpdateAlbumArtistsCommand } from '@core/app/cqrs/album/commands/update-album-artists/update-album-artists.command';
import { UpdateAlbumArtistsHandler as CoreUpdateAlbumArtistsHandler } from '@core/app/cqrs/album/commands/update-album-artists/update-album-artists.handler';
import { ArtistService } from '@core/app/components/artist/artist.service';

@CommandHandler(UpdateAlbumArtistsCommand)
export class UpdateAlbumArtistsHandler implements ICommandHandler<UpdateAlbumArtistsCommand> {
  private readonly _coreHandler: CoreUpdateAlbumArtistsHandler;

  constructor(
    @Inject(ArtistService) readonly artistService: ArtistService,
    @Inject(AlbumService) readonly albumService: AlbumService,
  ) {
    this._coreHandler = new CoreUpdateAlbumArtistsHandler(artistService, albumService);
  }

  execute(command: UpdateAlbumArtistsCommand) {
    return this._coreHandler.execute(command);
  }
}
