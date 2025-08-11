import { Inject } from '@nestjs/common';
import { EventHandler, ArtistDeletedEvent } from '@api.mabell/core';
import { ArtistCollection } from '../artist.collection';

export class DeleteArtistDocumentOnArtistDeletedEventHandler extends EventHandler<ArtistDeletedEvent> {
  constructor(@Inject(ArtistCollection) private readonly _collection: ArtistCollection) {
    super();
  }

  handle(event: ArtistDeletedEvent) {
    void this._collection.delete(event.payload.id);
  }
}
