import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { UserCollection } from '../user.collection';

export class CreateUserDocumentOnUserCreatedEventHandler extends App.Ports.EventHandler<
  App.Events.UserCreatedEvent | App.Events.UserRegisteredEvent | App.Events.UserUpdatedEvent
> {
  constructor(@Inject(UserCollection) private readonly _collection: UserCollection) {
    super();
  }

  handle(
    event:
      | App.Events.UserCreatedEvent
      | App.Events.UserRegisteredEvent
      | App.Events.UserUpdatedEvent,
  ) {
    void this._collection.save(event.payload);
  }
}
