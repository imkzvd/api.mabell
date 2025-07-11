import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { UpdateAlbumArtistsCommand } from '@core/app/cqrs/album/commands/update-album-artists/update-album-artists.command';
import { ArtistVerifyService } from '@core/app/components/artist/services/artist-verify.service';
import { AlbumUpdateService } from '@core/app/components/album/services/album-update.service';

export class UpdateAlbumArtistsHandler implements CommandHandler<UpdateAlbumArtistsCommand> {
  constructor(
    private readonly _artistVerifyService: ArtistVerifyService,
    private readonly _albumUpdateService: AlbumUpdateService,
  ) {}

  async execute({ id, artistIds }: UpdateAlbumArtistsCommand) {
    const verifiedArtistIdsResult = await this._artistVerifyService.verifyByIds(artistIds);

    if (verifiedArtistIdsResult.missingIds.length) {
      throw new NotFoundException('Artist does not exist');
    }

    return await this._albumUpdateService.updateArtists(id, {
      artists: verifiedArtistIdsResult.foundIds,
    });
  }
}
