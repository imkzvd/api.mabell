import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { UpdateTrackFeatArtistsCommand } from '@core/app/cqrs/track/commands/update-track-feat-artists/update-track-feat-artists.command';
import { ArtistVerifyService } from '@core/app/components/artist/services/artist-verify.service';
import { TrackUpdateService } from '@core/app/components/track/services/track-update.service';

export class UpdateTrackFeatArtistsHandler
  implements CommandHandler<UpdateTrackFeatArtistsCommand>
{
  constructor(
    private readonly _artistVerifyService: ArtistVerifyService,
    private readonly _trackUpdateService: TrackUpdateService,
  ) {}

  async execute({ id, artistIds }: UpdateTrackFeatArtistsCommand) {
    const verifiedArtistIdsResult = await this._artistVerifyService.verifyByIds(artistIds);

    if (verifiedArtistIdsResult.missingIds.length) {
      throw new NotFoundException('Artist does not exist');
    }

    return await this._trackUpdateService.updateFeatArtists(id, {
      artistIds: verifiedArtistIdsResult.foundIds,
    });
  }
}
