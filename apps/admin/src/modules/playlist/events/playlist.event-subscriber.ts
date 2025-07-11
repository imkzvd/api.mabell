import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { Inject } from '@nestjs/common';
import { EventBus } from '@infrastructure/event-bus';
import { DeletePlaylistsOnUserDeletedEventHandler } from '@core/app/components/playlist/event-handlers/delete-playlists-on-user-deleted.event-handler';
import { PlaylistDeleteService } from '@core/app/components/playlist/services/playlist-delete.service';
import { UserDeletedEvent } from '@core/app/common/events/user/user-deleted.event';

export class PlaylistEventSubscriber {
  constructor(
    @Inject(EventBus) private readonly _EB: EventBusPort,
    @Inject(PlaylistDeleteService) private readonly _service: PlaylistDeleteService,
  ) {
    const handler = new DeletePlaylistsOnUserDeletedEventHandler(this._service);

    this._EB.subscribe(UserDeletedEvent, handler);
  }
}
