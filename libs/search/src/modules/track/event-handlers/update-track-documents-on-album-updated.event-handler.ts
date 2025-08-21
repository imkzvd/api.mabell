import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class UpdateTrackDocumentsOnAlbumUpdatedEventHandler extends App.Ports
  .EventHandler<App.Events.AlbumUpdatedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: App.Events.AlbumUpdatedEvent) {
    void this._collection.updateAlbumDataByAlbumId(event.payload.id, event.payload);
  }
}
