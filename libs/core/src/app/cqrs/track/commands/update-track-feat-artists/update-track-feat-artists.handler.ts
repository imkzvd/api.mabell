import { CommandHandler } from '../../../../types';
import { UpdateTrackFeatArtistsCommand } from './update-track-feat-artists.command';
import { ArtistVerifyService } from '../../../../components/artist';
import { TrackUpdateService } from '../../../../components/track';
import { NotFoundException } from '../../../../../shared/exceptions';

export class UpdateTrackFeatArtistsHandler
  implements CommandHandler<UpdateTrackFeatArtistsCommand>
{
  constructor(
    private readonly _artistVerifyService: ArtistVerifyService,
    private readonly _trackUpdateService: TrackUpdateService,
  ) {}

  async execute({ id, artistIds }: UpdateTrackFeatArtistsCommand) {
    const { foundIds: foundArtistIds, missingIds: missingArtistIds } =
      await this._artistVerifyService.verifyByIds(artistIds);

    if (missingArtistIds.length) {
      throw new NotFoundException('Artist does not exist');
    }

    await this._trackUpdateService.updateFeatArtistsById(id, {
      artistIds: foundArtistIds,
    });
  }
}
