import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class DeleteTrackDocumentsOnArtistDeletedEventHandler extends App.Ports
  .EventHandler<App.Events.ArtistDeletedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: App.Events.ArtistDeletedEvent) {
    void this._collection.deleteByArtistId(event.payload.id);
  }
}
