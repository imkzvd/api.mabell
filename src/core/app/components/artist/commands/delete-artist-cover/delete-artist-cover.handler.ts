import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteArtistCoverCommand } from './delete-artist-cover.command';
import { ArtistService } from '../../artist.service';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { ArtistUpdatedEvent } from '../../../../common/events/artist-updated.event';

@CommandHandler(DeleteArtistCoverCommand)
export class DeleteArtistCoverHandler implements ICommandHandler<DeleteArtistCoverCommand> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: DeleteArtistCoverCommand) {
    await this._artistService.deleteArtistCover(id);

    this._eb.publish(new ArtistUpdatedEvent({ id }));
  }
}
