import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateAlbumCommand } from './create-album.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AlbumService } from '../../album.service';
import { AlbumCreatedEvent } from '../../../../common/events/album-created.event';
import { ArtistService } from '../../../artist/artist.service';
import { NotFoundException } from '../../../../../shared/exceptions';

@CommandHandler(CreateAlbumCommand)
export class CreateAlbumHandler implements ICommandHandler<CreateAlbumCommand> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(AlbumService) private readonly _albumService: AlbumService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ artistId }: CreateAlbumCommand) {
    const verifiedArtistId = await this._artistService.verifyArtistId(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist not found');
    }

    const createdAlbumId = await this._albumService.createAlbum({ artistId: verifiedArtistId });

    this._eb.publish(new AlbumCreatedEvent({ id: createdAlbumId }));

    return createdAlbumId;
  }
}
