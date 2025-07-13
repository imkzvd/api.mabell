import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { PlaylistDeletedEvent } from '@core/app/common/events/playlist/playlist-deleted.event';
import { PlaylistCollection } from '@infrastructure/typesense/modules/playlist/playlist.collection';

export class DeletePlaylistDocumentOnPlaylistDeletedEventHandler extends EventHandler<PlaylistDeletedEvent> {
  constructor(@Inject(PlaylistCollection) private readonly _collection: PlaylistCollection) {
    super();
  }

  handle(event: PlaylistDeletedEvent) {
    void this._collection.delete(event.payload.id);
  }
}
