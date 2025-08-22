import { PlaylistDeleteService } from '../services/playlist-delete.service';
import { EventHandler } from '../../../ports/event-bus/types';
import { UserDeletedEvent } from '../../../events';

export class DeletePlaylistsOnUserDeletedEventHandler extends EventHandler<UserDeletedEvent> {
  constructor(private readonly _service: PlaylistDeleteService) {
    super();
  }

  handle({ payload }: UserDeletedEvent) {
    void this._service.deleteByUserId(payload.id);
  }
}
