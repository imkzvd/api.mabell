import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { PlaylistCreatedEvent } from '@core/app/common/events/playlist/playlist-created.event';
import { PlaylistUpdatedEvent } from '@core/app/common/events/playlist/playlist-updated.event';
import { PlaylistCollection } from '@infrastructure/typesense/modules/playlist/playlist.collection';

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
