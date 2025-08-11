import { Inject } from '@nestjs/common';
import { EventHandler, AlbumDeletedEvent } from '@api.mabell/core';
import { AlbumCollection } from '../album.collection';

export class DeleteAlbumDocumentOnAlbumDeletedEventHandler extends EventHandler<AlbumDeletedEvent> {
  constructor(@Inject(AlbumCollection) private readonly _collection: AlbumCollection) {
    super();
  }

  handle(event: AlbumDeletedEvent) {
    void this._collection.delete(event.payload.id);
  }
}
