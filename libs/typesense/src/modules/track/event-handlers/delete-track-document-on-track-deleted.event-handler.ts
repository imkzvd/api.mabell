import { Inject } from '@nestjs/common';
import { EventHandler, TrackDeletedEvent } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class DeleteTrackDocumentOnTrackDeletedEventHandler extends EventHandler<TrackDeletedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: TrackDeletedEvent) {
    void this._collection.delete(event.payload.id);
  }
}
