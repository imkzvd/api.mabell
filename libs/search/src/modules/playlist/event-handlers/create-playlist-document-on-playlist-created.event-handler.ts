import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { PlaylistCollection } from '../playlist.collection';

export class CreatePlaylistDocumentOnPlaylistCreatedEventHandler extends App.Ports.EventHandler<
  App.Events.PlaylistCreatedEvent | App.Events.PlaylistUpdatedEvent
> {
  constructor(@Inject(PlaylistCollection) private readonly _collection: PlaylistCollection) {
    super();
  }

  handle(event: App.Events.PlaylistCreatedEvent | App.Events.PlaylistUpdatedEvent) {
    void this._collection.save(event.payload);
  }
}
