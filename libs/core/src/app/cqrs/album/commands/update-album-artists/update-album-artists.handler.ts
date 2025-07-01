import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { AlbumService } from '@core/app/components/album/album.service';
import { UpdateAlbumArtistsCommand } from '@core/app/cqrs/album/commands/update-album-artists/update-album-artists.command';

export class UpdateAlbumArtistsHandler implements CommandHandler<UpdateAlbumArtistsCommand> {
  constructor(
    private readonly _artistService: ArtistService,
    private readonly _albumService: AlbumService,
  ) {}

  async execute({ id, artists }: UpdateAlbumArtistsCommand) {
    const verifiedArtistIdsResult = await this._artistService.verifyArtistIds(artists);

    if (verifiedArtistIdsResult.missingIds.length) {
      throw new NotFoundException('Artist does not exist');
    }

    return await this._albumService.updateAlbumArtists(id, {
      artists: verifiedArtistIdsResult.foundIds,
    });
  }
}
