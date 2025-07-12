import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { UserCollection } from '@infrastructure/typesense/modules/user/user.collection';
import { UserUpdatedEvent } from '@core/app/common/events/user/user-updated.event';

export class UpdateUserDocumentOnUserUpdatedEventHandler extends EventHandler<UserUpdatedEvent> {
  constructor(@Inject(UserCollection) private readonly _collection: UserCollection) {
    super();
  }

  handle(event: UserUpdatedEvent) {
    console.log(event);
    void this._collection.save(event.payload);
  }
}
