import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class UpdateTrackDocumentsOnArtistUpdatedEventHandler extends App.Ports
  .EventHandler<App.Events.ArtistUpdatedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: App.Events.ArtistUpdatedEvent) {
    void this._collection.updateArtistDataByArtistId(event.payload.id, event.payload);
    void this._collection.updateFeatArtistDataByArtistId(event.payload.id, event.payload);
  }
}
