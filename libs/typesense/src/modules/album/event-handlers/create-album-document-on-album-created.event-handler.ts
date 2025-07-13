import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { AlbumCreatedEvent } from '@core/app/common/events/album/album-created.event';
import { AlbumUpdatedEvent } from '@core/app/common/events/album/album-updated.event';
import { AlbumCollection } from '@infrastructure/typesense/modules/album/album.collection';

export class CreateAlbumDocumentOnAlbumCreatedEventHandler extends EventHandler<
  AlbumCreatedEvent | AlbumUpdatedEvent
> {
  constructor(@Inject(AlbumCollection) private readonly _collection: AlbumCollection) {
    super();
  }

  handle(event: AlbumCreatedEvent | AlbumUpdatedEvent) {
    void this._collection.save(event.payload);
  }
}
