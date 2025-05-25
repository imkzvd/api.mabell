import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateArtistAvatarCommand } from './update-artist-avatar.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { ArtistService } from '../../artist.service';
import { ArtistUpdatedEvent } from '../../../../common/events/artist-updated.event';

@CommandHandler(UpdateArtistAvatarCommand)
export class UpdateArtistAvatarHandler implements ICommandHandler<UpdateArtistAvatarCommand> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdateArtistAvatarCommand) {
    await this._artistService.updateArtistAvatar(id, payload);

    this._eb.publish(new ArtistUpdatedEvent({ id }));
  }
}
