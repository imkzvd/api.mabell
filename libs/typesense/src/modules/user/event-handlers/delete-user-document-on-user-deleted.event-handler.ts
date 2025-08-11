import { Inject } from '@nestjs/common';
import { EventHandler, UserDeletedEvent } from '@api.mabell/core';
import { UserCollection } from '../user.collection';

export class DeleteUserDocumentOnUserDeletedEventHandler extends EventHandler<UserDeletedEvent> {
  constructor(@Inject(UserCollection) private readonly _collection: UserCollection) {
    super();
  }

  handle(event: UserDeletedEvent) {
    void this._collection.delete(event.payload.id);
  }
}
