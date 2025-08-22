import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class DeleteTrackDocumentOnTrackDeletedEventHandler extends App.Ports
  .EventHandler<App.Events.TrackDeletedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: App.Events.TrackDeletedEvent) {
    void this._collection.deleteById(event.payload.id);
  }
}
