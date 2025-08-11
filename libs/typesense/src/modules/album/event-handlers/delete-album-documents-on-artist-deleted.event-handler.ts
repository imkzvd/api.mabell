import { Inject } from '@nestjs/common';
import { EventHandler, ArtistDeletedEvent } from '@api.mabell/core';
import { AlbumCollection } from '../album.collection';

export class DeleteAlbumDocumentsOnArtistDeletedEventHandler extends EventHandler<ArtistDeletedEvent> {
  constructor(@Inject(AlbumCollection) private readonly _collection: AlbumCollection) {
    super();
  }

  handle(event: ArtistDeletedEvent) {
    void this._collection.deleteByArtistId(event.payload.id);
  }
}
