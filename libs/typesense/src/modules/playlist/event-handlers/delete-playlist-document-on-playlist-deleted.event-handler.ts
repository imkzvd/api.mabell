import { Inject } from '@nestjs/common';
import { EventHandler, PlaylistDeletedEvent } from '@api.mabell/core';
import { PlaylistCollection } from '../playlist.collection';

export class DeletePlaylistDocumentOnPlaylistDeletedEventHandler extends EventHandler<PlaylistDeletedEvent> {
  constructor(@Inject(PlaylistCollection) private readonly _collection: PlaylistCollection) {
    super();
  }

  handle(event: PlaylistDeletedEvent) {
    void this._collection.delete(event.payload.id);
  }
}
