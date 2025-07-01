import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { TrackService } from '@core/app/components/track/track.service';
import { UpdateTrackFeatArtistsCommand } from '@core/app/cqrs/track/commands/update-track-feat-artists/update-track-feat-artists.command';

export class UpdateTrackFeatArtistsHandler
  implements CommandHandler<UpdateTrackFeatArtistsCommand>
{
  constructor(
    private readonly _artistService: ArtistService,
    private readonly _trackService: TrackService,
  ) {}

  async execute({ id, artistIds }: UpdateTrackFeatArtistsCommand) {
    const verifiedArtistIds = await this._artistService.verifyArtistIds(artistIds);

    if (verifiedArtistIds.missingIds.length) {
      throw new NotFoundException('Artist does not exist');
    }

    return await this._trackService.updateFeatArtistsForTrack(id, {
      artistIds: verifiedArtistIds.foundIds,
    });
  }
}
