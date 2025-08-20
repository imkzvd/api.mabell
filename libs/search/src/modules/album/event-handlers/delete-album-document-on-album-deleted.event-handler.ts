import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { AlbumCollection } from '../album.collection';

export class DeleteAlbumDocumentOnAlbumDeletedEventHandler extends App.Ports
  .EventHandler<App.Events.AlbumDeletedEvent> {
  constructor(@Inject(AlbumCollection) private readonly _collection: AlbumCollection) {
    super();
  }

  handle(event: App.Events.AlbumDeletedEvent) {
    void this._collection.deleteById(event.payload.id);
  }
}
