import { Inject } from '@nestjs/common';
import {
  EventHandler,
  UserUpdatedEvent,
  UserCreatedEvent,
  UserRegisteredEvent,
} from '@api.mabell/core';
import { UserCollection } from '../user.collection';

export class CreateUserDocumentOnUserCreatedEventHandler extends EventHandler<
  UserCreatedEvent | UserRegisteredEvent | UserUpdatedEvent
> {
  constructor(@Inject(UserCollection) private readonly _collection: UserCollection) {
    super();
  }

  handle(event: UserCreatedEvent | UserRegisteredEvent | UserUpdatedEvent) {
    void this._collection.save(event.payload);
  }
}
