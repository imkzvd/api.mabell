import { Inject } from '@nestjs/common';
import { EventHandler, ArtistDeletedEvent } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class DeleteTrackDocumentsOnArtistDeletedEventHandler extends EventHandler<ArtistDeletedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: ArtistDeletedEvent) {
    void this._collection.deleteByArtistId(event.payload.id);
  }
}
