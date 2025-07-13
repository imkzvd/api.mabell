import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { UserUpdatedEvent } from '@core/app/common/events/user/user-updated.event';
import { PlaylistCollection } from '@infrastructure/typesense/modules/playlist/playlist.collection';

export class UpdatePlaylistDocumentsOnUserUpdatedEventHandler extends EventHandler<UserUpdatedEvent> {
  constructor(@Inject(PlaylistCollection) private readonly _collection: PlaylistCollection) {
    super();
  }

  handle(event: UserUpdatedEvent) {
    void this._collection.updateOwnerDataByUserId(event.payload.id, event.payload);
  }
}
