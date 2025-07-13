import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { TrackCreatedEvent } from '@core/app/common/events/track/track-created.event';
import { TrackUpdatedEvent } from '@core/app/common/events/track/track-updated.event';
import { TrackCollection } from '@infrastructure/typesense/modules/track/track.collection';

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
