import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAlbumCommand } from './delete-album.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AlbumService } from '../../album.service';
import { AlbumDeletedEvent } from '../../../../common/events/album-deleted.event';

@CommandHandler(DeleteAlbumCommand)
export class DeleteAlbumHandler implements ICommandHandler<DeleteAlbumCommand> {
  constructor(
    @Inject(AlbumService) private readonly _albumService: AlbumService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: DeleteAlbumCommand) {
    const deletedAlbumId = await this._albumService.deleteAlbum(id);

    this._eb.publish(new AlbumDeletedEvent({ id: deletedAlbumId }));

    return deletedAlbumId;
  }
}
