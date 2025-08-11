import { Inject } from '@nestjs/common';
import { EventHandler, TrackCreatedEvent, TrackUpdatedEvent } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class CreateTrackDocumentOnTrackCreatedEventHandler extends EventHandler<
  TrackCreatedEvent | TrackUpdatedEvent
> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: TrackCreatedEvent | TrackUpdatedEvent) {
    void this._collection.save(event.payload);
  }
}
