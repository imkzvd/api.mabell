import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';
import { UpdateTrackFeatArtistsCommand } from './update-track-feat-artists.command';
import {
  TRACK_WRITE_REPOSITORY_DI_TOKEN,
  TrackWriteRepository,
} from '../../../../../domain/components/track/repository/track-write-repository.port';

@CommandHandler(UpdateTrackFeatArtistsCommand)
export class UpdateTrackFeatArtistsHandler
  implements ICommandHandler<UpdateTrackFeatArtistsCommand>
{
  constructor(
    @Inject(TRACK_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _trackWriteRepository: TrackWriteRepository,
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
  ) {}

  async execute({ trackId, artists }: UpdateTrackFeatArtistsCommand) {
    const foundTrack = await this._trackWriteRepository.findById(trackId);

    if (!foundTrack) {
      throw new NotFoundException(`There is no track with the specified ID`);
    }

    const foundArtistsResp = await this._artistWriteRepository.existsByIds(artists);

    if (foundArtistsResp.missingIds.length) {
      throw new NotFoundException(`There is no artist with the specified ID`);
    }

    foundTrack.updateFeaturedArtists(foundArtistsResp.foundIds);

    return this._trackWriteRepository.save(foundTrack);
  }
}
