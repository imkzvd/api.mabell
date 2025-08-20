import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { PlaylistCollection } from '../playlist.collection';

export class DeletePlaylistDocumentOnPlaylistDeletedEventHandler extends App.Ports
  .EventHandler<App.Events.PlaylistDeletedEvent> {
  constructor(@Inject(PlaylistCollection) private readonly _collection: PlaylistCollection) {
    super();
  }

  handle(event: App.Events.PlaylistDeletedEvent) {
    void this._collection.deleteById(event.payload.id);
  }
}
