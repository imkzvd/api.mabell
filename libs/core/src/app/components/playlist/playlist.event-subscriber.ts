import { Inject } from '@nestjs/common';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../common/ports/event-bus.port';
import { PlaylistService } from './playlist.service';
import { UserDeletedEvent } from '../../common/events/user-deleted.event';

export class PlaylistEventSubscriber {
  constructor(
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
    @Inject(PlaylistService) private readonly _playlistService: PlaylistService,
  ) {
    this._eb.subscribe(UserDeletedEvent, ({ id }) => {
      void this._playlistService.deletePlaylistsByOwnerId(id);
    });
  }
}
