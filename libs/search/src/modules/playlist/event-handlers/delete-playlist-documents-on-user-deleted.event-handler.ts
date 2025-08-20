import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { PlaylistCollection } from '../playlist.collection';

export class DeletePlaylistDocumentsOnUserDeletedEventHandler extends App.Ports
  .EventHandler<App.Events.UserDeletedEvent> {
  constructor(@Inject(PlaylistCollection) private readonly _collection: PlaylistCollection) {
    super();
  }

  handle(event: App.Events.UserDeletedEvent) {
    void this._collection.deleteByUserId(event.payload.id);
  }
}
