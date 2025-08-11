import { Inject } from '@nestjs/common';
import { EventHandler, PlaylistCreatedEvent, PlaylistUpdatedEvent } from '@api.mabell/core';
import { PlaylistCollection } from '../playlist.collection';

export class CreatePlaylistDocumentOnPlaylistCreatedEventHandler extends EventHandler<
  PlaylistCreatedEvent | PlaylistUpdatedEvent
> {
  constructor(@Inject(PlaylistCollection) private readonly _collection: PlaylistCollection) {
    super();
  }

  handle(event: PlaylistCreatedEvent | PlaylistUpdatedEvent) {
    void this._collection.save(event.payload);
  }
}
