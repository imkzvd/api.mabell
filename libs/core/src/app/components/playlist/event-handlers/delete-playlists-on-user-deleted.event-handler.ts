import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { UserDeletedEvent } from '@core/app/common/events/user/user-deleted.event';
import { PlaylistDeleteService } from '@core/app/components/playlist/services/playlist-delete.service';

export class DeletePlaylistsOnUserDeletedEventHandler extends EventHandler<UserDeletedEvent> {
  constructor(private readonly _service: PlaylistDeleteService) {
    super();
  }

  handle({ payload }: UserDeletedEvent) {
    void this._service.deleteByUserId(payload.id);
  }
}
