import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { TrackDeletedEvent } from '@core/app/common/events/track/track-deleted.event';
import { TrackCollection } from '@infrastructure/typesense/modules/track/track.collection';

export class DeleteTrackDocumentOnTrackDeletedEventHandler extends EventHandler<TrackDeletedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: TrackDeletedEvent) {
    void this._collection.delete(event.payload.id);
  }
}
