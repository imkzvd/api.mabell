import { Event } from '@core/app/common/ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserPasswordUpdatedEventPayload = {
  id: UserId;
};

export class UserPasswordUpdatedEvent extends Event<UserPasswordUpdatedEventPayload> {
  public readonly name = 'user.password-updated';

  constructor(public readonly payload: UserPasswordUpdatedEventPayload) {
    super();
  }
}
