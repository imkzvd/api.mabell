import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { ArtistDeletedEvent } from '@core/app/common/events/artist/artist-deleted.event';
import { TrackCollection } from '@infrastructure/typesense/modules/track/track.collection';

export class DeleteTrackDocumentsOnArtistDeletedEventHandler extends EventHandler<ArtistDeletedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: ArtistDeletedEvent) {
    void this._collection.deleteByArtistId(event.payload.id);
  }
}
