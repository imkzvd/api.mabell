import { Inject } from '@nestjs/common';
import { EventHandler, AlbumUpdatedEvent } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class UpdateTrackDocumentsOnAlbumUpdatedEventHandler extends EventHandler<AlbumUpdatedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: AlbumUpdatedEvent) {
    void this._collection.updateAlbumDataByAlbumId(event.payload.id, event.payload);
  }
}
