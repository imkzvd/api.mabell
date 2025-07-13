import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { AlbumDeletedEvent } from '@core/app/common/events/album/album-deleted.event';
import { AlbumCollection } from '@infrastructure/typesense/modules/album/album.collection';

export class DeleteAlbumDocumentOnAlbumDeletedEventHandler extends EventHandler<AlbumDeletedEvent> {
  constructor(@Inject(AlbumCollection) private readonly _collection: AlbumCollection) {
    super();
  }

  handle(event: AlbumDeletedEvent) {
    void this._collection.delete(event.payload.id);
  }
}
