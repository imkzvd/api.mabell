import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAlbumCommand } from './update-album.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AlbumService } from '../../album.service';
import { AlbumUpdatedEvent } from '../../../../common/events/album-updated.event';

@CommandHandler(UpdateAlbumCommand)
export class UpdateAlbumHandler implements ICommandHandler<UpdateAlbumCommand> {
  constructor(
    @Inject(AlbumService) private readonly _albumService: AlbumService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdateAlbumCommand) {
    const updatedAlbumId = await this._albumService.updateAlbum(id, payload);

    this._eb.publish(new AlbumUpdatedEvent({ id: updatedAlbumId }));

    return updatedAlbumId;
  }
}
