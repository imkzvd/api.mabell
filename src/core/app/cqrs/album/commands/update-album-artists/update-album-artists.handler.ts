import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAlbumArtistsCommand } from './update-album-artists.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AlbumUpdatedEvent } from '../../../../common/events/album-updated.event';
import { AlbumArtistsUpdatedEvent } from '../../../../common/events/album-artists-updated.event';
import { NotFoundException } from '../../../../../shared/exceptions';
import { ArtistService } from '../../../../components/artist/artist.service';
import { AlbumService } from '../../../../components/album/album.service';

@CommandHandler(UpdateAlbumArtistsCommand)
export class UpdateAlbumArtistsHandler implements ICommandHandler<UpdateAlbumArtistsCommand> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(AlbumService) private readonly _albumService: AlbumService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, artists }: UpdateAlbumArtistsCommand) {
    const verifiedArtistIdsResult = await this._artistService.verifyArtistIds(artists);

    if (verifiedArtistIdsResult.missingIds.length) {
      throw new NotFoundException('Artist does not exist');
    }

    const updatedAlbumId = await this._albumService.updateAlbumArtists(id, {
      artists: verifiedArtistIdsResult.foundIds,
    });

    this._eb.publish(new AlbumArtistsUpdatedEvent({ id: updatedAlbumId }));
    this._eb.publish(new AlbumUpdatedEvent({ id: updatedAlbumId }));

    return updatedAlbumId;
  }
}
