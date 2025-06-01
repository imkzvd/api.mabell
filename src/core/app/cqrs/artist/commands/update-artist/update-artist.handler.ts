import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateArtistCommand } from './update-artist.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { ArtistUpdatedEvent } from '../../../../common/events/artist-updated.event';
import { ArtistService } from '../../../../components/artist/artist.service';

@CommandHandler(UpdateArtistCommand)
export class UpdateArtistHandler implements ICommandHandler<UpdateArtistCommand> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdateArtistCommand) {
    const updatedArtistId = await this._artistService.updateArtist(id, payload);

    this._eb.publish(new ArtistUpdatedEvent({ id: updatedArtistId }));

    return updatedArtistId;
  }
}
