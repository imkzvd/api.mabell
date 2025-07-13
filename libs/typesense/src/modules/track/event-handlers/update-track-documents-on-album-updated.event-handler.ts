import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { AlbumUpdatedEvent } from '@core/app/common/events/album/album-updated.event';
import { TrackCollection } from '@infrastructure/typesense/modules/track/track.collection';

export class UpdateTrackDocumentsOnAlbumUpdatedEventHandler extends EventHandler<AlbumUpdatedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: AlbumUpdatedEvent) {
    void this._collection.updateAlbumDataByAlbumId(event.payload.id, event.payload);
  }
}
