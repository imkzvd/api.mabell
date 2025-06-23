import { QueryBus } from '@nestjs/cqrs';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { UserCreatedEvent } from '@core/app/common/events/user-created.event';
import { GetUserQuery } from '@core/app/cqrs/user/queries/get-user/get-user.query';
import { UserDeletedEvent } from '@core/app/common/events/user-deleted.event';
import { UserUpdatedEvent } from '@core/app/common/events/user-updated.event';
import { UserRegisteredEvent } from '@core/app/common/events/user-registered.event';
import { UserCollection } from './user.collection';

export class UserEventSubscriber {
  constructor(
    private readonly _QB: QueryBus,
    private readonly _EB: EventBus,
    private readonly _collection: UserCollection,
  ) {
    this._EB.subscribe(UserCreatedEvent, async ({ id }) => this.saveUserDocument(id));
    this._EB.subscribe(UserRegisteredEvent, async ({ id }) => this.saveUserDocument(id));
    this._EB.subscribe(UserUpdatedEvent, async ({ id }) => this.saveUserDocument(id));
    this._EB.subscribe(UserDeletedEvent, async ({ id }) => {
      return this._collection.deleteById(id);
    });
  }

  async saveUserDocument(id: string) {
    const foundUser = await this._QB.execute(new GetUserQuery(id));

    if (!foundUser) {
      return;
    }

    await this._collection.save(foundUser);
  }
}
