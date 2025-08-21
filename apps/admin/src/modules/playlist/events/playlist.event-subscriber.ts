import { Inject } from '@nestjs/common';
import { EventBus } from '@api.mabell/event-bus';
import { App } from '@api.mabell/core';

export class PlaylistEventSubscriber {
  constructor(
    @Inject(EventBus) private readonly _EB: EventBus,
    @Inject(App.Components.Playlist.PlaylistDeleteService)
    private readonly _service: App.Components.Playlist.PlaylistDeleteService,
  ) {
    const handler = new App.Components.Playlist.DeletePlaylistsOnUserDeletedEventHandler(
      this._service,
    );

    this._EB.subscribe(App.Events.UserDeletedEvent, handler);
  }
}
