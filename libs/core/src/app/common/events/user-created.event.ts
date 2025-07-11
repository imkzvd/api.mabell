import { Event } from '@core/app/common/ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserCreatedEventPayload = {
  id: UserId;
  name: string;
  email: string | null;
  avatar: string | null;
};

export class UserCreatedEvent extends Event<UserCreatedEventPayload> {
  public readonly name = 'user.created';

  constructor(public readonly payload: UserCreatedEventPayload) {
    super();
  }
}
