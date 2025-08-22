import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { AlbumCollection } from '../album.collection';

export class CreateAlbumDocumentOnAlbumCreatedEventHandler extends App.Ports.EventHandler<
  App.Events.AlbumCreatedEvent | App.Events.AlbumUpdatedEvent
> {
  constructor(@Inject(AlbumCollection) private readonly _collection: AlbumCollection) {
    super();
  }

  handle(event: App.Events.AlbumCreatedEvent | App.Events.AlbumUpdatedEvent) {
    void this._collection.save(event.payload);
  }
}
