import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteArtistCommand } from './delete-artist.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { ArtistService } from '../../artist.service';
import { ArtistDeletedEvent } from '../../../../common/events/artist-deleted.event';

@CommandHandler(DeleteArtistCommand)
export class DeleteArtistHandler implements ICommandHandler<DeleteArtistCommand> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: DeleteArtistCommand) {
    const deletedArtistId = await this._artistService.deleteArtist(id);

    this._eb.publish(new ArtistDeletedEvent({ id: deletedArtistId }));

    return deletedArtistId;
  }
}
