import { Inject } from '@nestjs/common';
import { EventHandler, ArtistUpdatedEvent, ArtistCreatedEvent } from '@api.mabell/core';
import { ArtistCollection } from '../artist.collection';

export class CreateArtistDocumentOnArtistCreatedEventHandler extends EventHandler<
  ArtistCreatedEvent | ArtistUpdatedEvent
> {
  constructor(@Inject(ArtistCollection) private readonly _collection: ArtistCollection) {
    super();
  }

  handle(event: ArtistCreatedEvent | ArtistUpdatedEvent) {
    void this._collection.save(event.payload);
  }
}
