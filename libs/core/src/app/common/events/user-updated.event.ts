import { Event } from '@core/app/common/ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserUpdatedEventPayload = {
  id: UserId;
  name: string;
  email: string | null;
  avatar: string | null;
};

export class UserUpdatedEvent extends Event<UserUpdatedEventPayload> {
  public readonly name = 'user.updated';

  constructor(public readonly payload: UserUpdatedEventPayload) {
    super();
  }
}
