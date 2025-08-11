import { Inject } from '@nestjs/common';
import { EventHandler, AlbumDeletedEvent } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class DeleteTrackDocumentsOnAlbumDeletedEventHandler extends EventHandler<AlbumDeletedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: AlbumDeletedEvent) {
    void this._collection.deleteByAlbumId(event.payload.id);
  }
}
