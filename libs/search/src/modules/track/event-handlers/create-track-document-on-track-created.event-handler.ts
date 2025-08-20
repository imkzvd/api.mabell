import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class CreateTrackDocumentOnTrackCreatedEventHandler extends App.Ports.EventHandler<
  App.Events.TrackCreatedEvent | App.Events.TrackUpdatedEvent
> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: App.Events.TrackCreatedEvent | App.Events.TrackUpdatedEvent) {
    void this._collection.save(event.payload);
  }
}
