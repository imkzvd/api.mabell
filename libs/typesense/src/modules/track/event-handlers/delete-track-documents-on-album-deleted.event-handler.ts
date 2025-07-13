import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { AlbumDeletedEvent } from '@core/app/common/events/album/album-deleted.event';
import { TrackCollection } from '@infrastructure/typesense/modules/track/track.collection';

export class DeleteTrackDocumentsOnAlbumDeletedEventHandler extends EventHandler<AlbumDeletedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: AlbumDeletedEvent) {
    void this._collection.deleteByAlbumId(event.payload.id);
  }
}
