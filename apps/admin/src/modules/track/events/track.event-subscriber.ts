import { Inject } from '@nestjs/common';
import { EventBus } from '@api.mabell/event-bus';
import { App } from '@api.mabell/core';

export class TrackEventSubscriber {
  constructor(
    @Inject(EventBus) private readonly _EB: EventBus,
    @Inject(App.Components.Track.TrackDeleteService)
    private readonly _service: App.Components.Track.TrackDeleteService,
  ) {
    const deleteTracksOnArtistDeletedEventHandler =
      new App.Components.Track.DeleteTracksOnArtistDeletedEventHandler(this._service);
    const deleteTracksOnAlbumDeletedEventHandler =
      new App.Components.Track.DeleteTracksOnAlbumDeletedEventHandler(this._service);

    this._EB.subscribe(App.Events.ArtistDeletedEvent, deleteTracksOnArtistDeletedEventHandler);
    this._EB.subscribe(App.Events.AlbumDeletedEvent, deleteTracksOnAlbumDeletedEventHandler);
  }
}
