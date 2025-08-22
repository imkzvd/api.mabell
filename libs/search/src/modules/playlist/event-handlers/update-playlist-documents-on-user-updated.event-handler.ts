import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { PlaylistCollection } from '../playlist.collection';

export class UpdatePlaylistDocumentsOnUserUpdatedEventHandler extends App.Ports
  .EventHandler<App.Events.UserUpdatedEvent> {
  constructor(@Inject(PlaylistCollection) private readonly _collection: PlaylistCollection) {
    super();
  }

  handle(event: App.Events.UserUpdatedEvent) {
    void this._collection.updateUserDataByUserId(event.payload.id, event.payload);
  }
}
