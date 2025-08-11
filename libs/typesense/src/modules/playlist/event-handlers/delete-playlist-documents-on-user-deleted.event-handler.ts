import { Inject } from '@nestjs/common';
import { EventHandler, UserDeletedEvent } from '@api.mabell/core';
import { PlaylistCollection } from '../playlist.collection';

export class DeletePlaylistDocumentsOnUserDeletedEventHandler extends EventHandler<UserDeletedEvent> {
  constructor(@Inject(PlaylistCollection) private readonly _collection: PlaylistCollection) {
    super();
  }

  handle(event: UserDeletedEvent) {
    void this._collection.deleteByUserId(event.payload.id);
  }
}
