import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { AlbumCollection } from '../album.collection';

export class DeleteAlbumDocumentsOnArtistDeletedEventHandler extends App.Ports
  .EventHandler<App.Events.ArtistDeletedEvent> {
  constructor(@Inject(AlbumCollection) private readonly _collection: AlbumCollection) {
    super();
  }

  handle(event: App.Events.ArtistDeletedEvent) {
    void this._collection.deleteByArtistId(event.payload.id);
  }
}
