import { Inject } from '@nestjs/common';
import { EventHandler, ArtistUpdatedEvent } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class UpdateTrackDocumentsOnArtistUpdatedEventHandler extends EventHandler<ArtistUpdatedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: ArtistUpdatedEvent) {
    void this._collection.updateArtistDataByArtistId(event.payload.id, event.payload);
    void this._collection.updateFeatArtistDataByArtistId(event.payload.id, event.payload);
  }
}
