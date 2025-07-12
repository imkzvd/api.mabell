import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { UserCollection } from '@infrastructure/typesense/modules/user/user.collection';
import { UserUpdatedEvent } from '@core/app/common/events/user/user-updated.event';
import { UserCreatedEvent } from '@core/app/common/events/user/user-created.event';
import { UserRegisteredEvent } from '@core/app/common/events/user/user-registered.event';

export class SaveUserDocumentOnUserUpdatedEventHandler extends EventHandler<
  UserCreatedEvent | UserRegisteredEvent | UserUpdatedEvent
> {
  constructor(@Inject(UserCollection) private readonly _collection: UserCollection) {
    super();
  }

  handle(event: UserCreatedEvent | UserRegisteredEvent | UserUpdatedEvent) {
    void this._collection.save(event.payload);
  }
}
