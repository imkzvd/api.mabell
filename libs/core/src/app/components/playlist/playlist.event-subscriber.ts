import { EventBus } from '../../common/ports/event-bus.port';
import { PlaylistService } from './playlist.service';
import { UserDeletedEvent } from '../../common/events/user-deleted.event';

export class PlaylistEventSubscriber {
  constructor(
    private readonly _EB: EventBus,
    private readonly _playlistService: PlaylistService,
  ) {
    this._EB.subscribe(UserDeletedEvent, ({ id }) => {
      void this._playlistService.deletePlaylistsByOwnerId(id);
    });
  }
}
