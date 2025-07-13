import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { UserDeletedEvent } from '@core/app/common/events/user/user-deleted.event';
import { UserCollection } from '@infrastructure/typesense/modules/user/user.collection';

export class DeleteUserDocumentOnUserDeletedEventHandler extends EventHandler<UserDeletedEvent> {
  constructor(@Inject(UserCollection) private readonly _collection: UserCollection) {
    super();
  }

  handle(event: UserDeletedEvent) {
    void this._collection.delete(event.payload.id);
  }
}
