import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTrackFeatArtistsCommand } from './update-track-feat-artists.command';
import { NotFoundException } from '../../../../../shared/exceptions';
import { ArtistService } from '../../../../components/artist/artist.service';
import { TrackService } from '../../../../components/track/track.service';

@CommandHandler(UpdateTrackFeatArtistsCommand)
export class UpdateTrackFeatArtistsHandler
  implements ICommandHandler<UpdateTrackFeatArtistsCommand>
{
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(TrackService) private readonly _trackService: TrackService,
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
