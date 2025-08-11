import { Inject } from '@nestjs/common';
import { EventHandler, AlbumCreatedEvent, AlbumUpdatedEvent } from '@api.mabell/core';
import { AlbumCollection } from '../album.collection';

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
