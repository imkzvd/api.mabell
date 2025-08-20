import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { UserCollection } from '../user.collection';

export class DeleteUserDocumentOnUserDeletedEventHandler extends App.Ports
  .EventHandler<App.Events.UserDeletedEvent> {
  constructor(@Inject(UserCollection) private readonly _collection: UserCollection) {
    super();
  }

  handle(event: App.Events.UserDeletedEvent) {
    void this._collection.deleteById(event.payload.id);
  }
}
