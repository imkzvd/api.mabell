import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { ArtistCollection } from '../artist.collection';

export class DeleteArtistDocumentOnArtistDeletedEventHandler extends App.Ports
  .EventHandler<App.Events.ArtistDeletedEvent> {
  constructor(@Inject(ArtistCollection) private readonly _collection: ArtistCollection) {
    super();
  }

  handle(event: App.Events.ArtistDeletedEvent) {
    void this._collection.deleteById(event.payload.id);
  }
}
