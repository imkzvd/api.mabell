import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAlbumCoverCommand } from './delete-album-cover.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AlbumUpdatedEvent } from '../../../../common/events/album-updated.event';
import { AlbumCoverDeletedEvent } from '../../../../common/events/album-cover-deleted.event';
import { AlbumService } from '../../../../components/album/album.service';

@CommandHandler(DeleteAlbumCoverCommand)
export class DeleteAlbumCoverHandler implements ICommandHandler<DeleteAlbumCoverCommand> {
  constructor(
    @Inject(AlbumService) private readonly _albumService: AlbumService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: DeleteAlbumCoverCommand) {
    const updatedAlbumId = await this._albumService.deleteAlbumCover(id);

    this._eb.publish(new AlbumCoverDeletedEvent({ id: updatedAlbumId }));
    this._eb.publish(new AlbumUpdatedEvent({ id: updatedAlbumId }));

    return updatedAlbumId;
  }
}
