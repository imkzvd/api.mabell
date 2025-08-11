import { Inject } from '@nestjs/common';
import { EventHandler, ArtistUpdatedEvent } from '@api.mabell/core';
import { AlbumCollection } from '../album.collection';

export class UpdateAlbumDocumentsOnArtistUpdatedEventHandler extends EventHandler<ArtistUpdatedEvent> {
  constructor(@Inject(AlbumCollection) private readonly _collection: AlbumCollection) {
    super();
  }

  handle(event: ArtistUpdatedEvent) {
    void this._collection.updateArtistsDataByArtistId(event.payload.id, event.payload);
  }
}
