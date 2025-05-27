import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAlbumCoverCommand } from './update-album-cover.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AlbumService } from '../../album.service';
import { AlbumUpdatedEvent } from '../../../../common/events/album-updated.event';
import { AlbumCoverUpdatedEvent } from '../../../../common/events/album-cover-updated.event';

@CommandHandler(UpdateAlbumCoverCommand)
export class UpdateAlbumCoverHandler implements ICommandHandler<UpdateAlbumCoverCommand> {
  constructor(
    @Inject(AlbumService) private readonly _albumService: AlbumService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdateAlbumCoverCommand) {
    const updatedAlbumId = await this._albumService.updateAlbumCover(id, payload);

    this._eb.publish(new AlbumCoverUpdatedEvent({ id: updatedAlbumId }));
    this._eb.publish(new AlbumUpdatedEvent({ id: updatedAlbumId }));

    return updatedAlbumId;
  }
}
