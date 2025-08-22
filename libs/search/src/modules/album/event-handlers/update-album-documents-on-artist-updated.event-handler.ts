import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { AlbumCollection } from '../album.collection';

export class UpdateAlbumDocumentsOnArtistUpdatedEventHandler extends App.Ports
  .EventHandler<App.Events.ArtistUpdatedEvent> {
  constructor(@Inject(AlbumCollection) private readonly _collection: AlbumCollection) {
    super();
  }

  handle(event: App.Events.ArtistUpdatedEvent) {
    void this._collection.updateArtistsDataByArtistId(event.payload.id, event.payload);
  }
}
