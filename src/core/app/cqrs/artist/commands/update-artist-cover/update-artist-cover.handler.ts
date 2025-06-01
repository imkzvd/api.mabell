import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateArtistCoverCommand } from './update-artist-cover.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { ArtistUpdatedEvent } from '../../../../common/events/artist-updated.event';
import { ArtistService } from '../../../../components/artist/artist.service';

@CommandHandler(UpdateArtistCoverCommand)
export class UpdateArtistCoverHandler implements ICommandHandler<UpdateArtistCoverCommand> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdateArtistCoverCommand) {
    const updatedArtistId = await this._artistService.updateArtistCover(id, payload);

    this._eb.publish(new ArtistUpdatedEvent({ id: updatedArtistId }));

    return updatedArtistId;
  }
}
