import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateArtistCommand } from './create-artist.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { ArtistCreatedEvent } from '../../../../common/events/artist-created.event';
import { ArtistService } from '../../../../components/artist/artist.service';

@CommandHandler(CreateArtistCommand)
export class CreateArtistHandler implements ICommandHandler<CreateArtistCommand> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eventsBus: EventBus,
  ) {}

  async execute() {
    const createdArtistId = await this._artistService.createArtist();

    this._eventsBus.publish(new ArtistCreatedEvent({ id: createdArtistId }));

    return createdArtistId;
  }
}
