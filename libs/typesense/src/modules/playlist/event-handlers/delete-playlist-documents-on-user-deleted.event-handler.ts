import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { PlaylistCollection } from '@infrastructure/typesense/modules/playlist/playlist.collection';
import { UserDeletedEvent } from '@core/app/common/events/user/user-deleted.event';

export class DeletePlaylistDocumentsOnUserDeletedEventHandler extends EventHandler<UserDeletedEvent> {
  constructor(@Inject(PlaylistCollection) private readonly _collection: PlaylistCollection) {
    super();
  }

  handle(event: UserDeletedEvent) {
    void this._collection.deleteByUserId(event.payload.id);
  }
}
