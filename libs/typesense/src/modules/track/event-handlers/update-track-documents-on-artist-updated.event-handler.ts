import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { TrackCollection } from '@infrastructure/typesense/modules/track/track.collection';
import { ArtistUpdatedEvent } from '@core/app/common/events/artist/artist-updated.event';

export class UpdateTrackDocumentsOnArtistUpdatedEventHandler extends EventHandler<ArtistUpdatedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: ArtistUpdatedEvent) {
    void this._collection.updateArtistDataByArtistId(event.payload.id, event.payload);
    void this._collection.updateFeatArtistDataByArtistId(event.payload.id, event.payload);
  }
}
