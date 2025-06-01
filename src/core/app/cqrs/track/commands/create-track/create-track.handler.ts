import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateTrackCommand } from './create-track.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { TrackCreatedEvent } from '../../../../common/events/track-created.event';
import { NotFoundException } from '../../../../../shared/exceptions';
import { AlbumService } from '../../../../components/album/album.service';
import { TrackService } from '../../../../components/track/track.service';

@CommandHandler(CreateTrackCommand)
export class CreateTrackHandler implements ICommandHandler<CreateTrackCommand> {
  constructor(
    @Inject(AlbumService) private readonly _albumService: AlbumService,
    @Inject(TrackService) private readonly _trackService: TrackService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ albumId }: CreateTrackCommand) {
    const verifiedAlbumId = await this._albumService.verifyAlbumId(albumId);
    const albumArtistIds = await this._albumService.getAlbumArtistsById(albumId);

    if (!verifiedAlbumId) {
      throw new NotFoundException('Album does not exist');
    }

    const createdTrackId = await this._trackService.createTrack({
      albumId: verifiedAlbumId,
      artistIds: albumArtistIds,
    });

    this._eb.publish(new TrackCreatedEvent({ id: createdTrackId }));

    return createdTrackId;
  }
}
