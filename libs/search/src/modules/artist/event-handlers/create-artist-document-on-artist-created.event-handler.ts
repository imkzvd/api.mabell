import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { ArtistCollection } from '../artist.collection';

export class CreateArtistDocumentOnArtistCreatedEventHandler extends App.Ports.EventHandler<
  App.Events.ArtistCreatedEvent | App.Events.ArtistUpdatedEvent
> {
  constructor(@Inject(ArtistCollection) private readonly _collection: ArtistCollection) {
    super();
  }

  handle(event: App.Events.ArtistCreatedEvent | App.Events.ArtistUpdatedEvent) {
    void this._collection.save(event.payload);
  }
}
