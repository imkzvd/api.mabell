import { Inject } from '@nestjs/common';
import { EventBus } from '@api.mabell/event-bus';
import { App } from '@api.mabell/core';

export class TrackEventSubscriber {
  constructor(
    @Inject(EventBus) private readonly _EB: EventBus,
    @Inject(App.Components.Track.TrackUpdateService)
    private readonly _updateService: App.Components.Track.TrackUpdateService,
    @Inject(App.Components.Track.TrackDeleteService)
    private readonly _deleteService: App.Components.Track.TrackDeleteService,
  ) {
    const updateTracksOnAlbumArtistsUpdatedEventHandler =
      new App.Components.Track.UpdateTracksOnAlbumArtistsUpdatedEventHandler(this._updateService);
    const deleteTracksOnArtistDeletedEventHandler =
      new App.Components.Track.DeleteTracksOnArtistDeletedEventHandler(this._deleteService);
    const deleteTracksOnAlbumDeletedEventHandler =
      new App.Components.Track.DeleteTracksOnAlbumDeletedEventHandler(this._deleteService);

    this._EB.subscribe(
      App.Events.AlbumArtistsUpdatedEvent,
      updateTracksOnAlbumArtistsUpdatedEventHandler,
    );
    this._EB.subscribe(App.Events.ArtistDeletedEvent, deleteTracksOnArtistDeletedEventHandler);
    this._EB.subscribe(App.Events.AlbumDeletedEvent, deleteTracksOnAlbumDeletedEventHandler);
  }
}
