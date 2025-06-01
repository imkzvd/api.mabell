import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTrackFeatArtistsCommand } from './update-track-feat-artists.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { TrackCreatedEvent } from '../../../../common/events/track-created.event';
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
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, artistIds }: UpdateTrackFeatArtistsCommand) {
    const verifiedArtistIds = await this._artistService.verifyArtistIds(artistIds);

    if (verifiedArtistIds.missingIds.length) {
      throw new NotFoundException('Artist does not exist');
    }

    const updatedTrackId = await this._trackService.updateFeatArtistsForTrack(id, {
      artistIds: verifiedArtistIds.foundIds,
    });

    this._eb.publish(new TrackCreatedEvent({ id: updatedTrackId }));

    return updatedTrackId;
  }
}
