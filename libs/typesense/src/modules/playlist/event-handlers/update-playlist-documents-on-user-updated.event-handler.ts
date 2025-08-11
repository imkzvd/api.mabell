import { Inject } from '@nestjs/common';
import { EventHandler, UserUpdatedEvent } from '@api.mabell/core';
import { PlaylistCollection } from '../playlist.collection';

export class UpdatePlaylistDocumentsOnUserUpdatedEventHandler extends EventHandler<UserUpdatedEvent> {
  constructor(@Inject(PlaylistCollection) private readonly _collection: PlaylistCollection) {
    super();
  }

  handle(event: UserUpdatedEvent) {
    void this._collection.updateUserDataByUserId(event.payload.id, event.payload);
  }
}
