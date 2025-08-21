import { Inject } from '@nestjs/common';
import { EventBus } from '@api.mabell/event-bus';
import { App } from '@api.mabell/core';

export class AlbumEventSubscriber {
  constructor(
    @Inject(EventBus) private readonly _EB: EventBus,
    @Inject(App.Components.Album.AlbumDeleteService)
    private readonly _service: App.Components.Album.AlbumDeleteService,
  ) {
    const handler = new App.Components.Album.DeleteAlbumsOnArtistDeletedEventHandler(this._service);

    this._EB.subscribe(App.Events.ArtistDeletedEvent, handler);
  }
}
