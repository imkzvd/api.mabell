import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteArtistAvatarCommand } from './delete-artist-avatar.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { ArtistService } from '../../artist.service';
import { ArtistUpdatedEvent } from '../../../../common/events/artist-updated.event';

@CommandHandler(DeleteArtistAvatarCommand)
export class DeleteArtistAvatarHandler implements ICommandHandler<DeleteArtistAvatarCommand> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: DeleteArtistAvatarCommand) {
    await this._artistService.deleteArtistAvatar(id);

    this._eb.publish(new ArtistUpdatedEvent({ id }));
  }
}
