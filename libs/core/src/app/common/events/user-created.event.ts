import { Event } from '../ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserCreatedPayload = {
  id: UserId;
};

export class UserCreatedEvent implements Event<UserCreatedPayload> {
  public readonly name = 'user.created';

  constructor(public readonly payload: UserCreatedPayload) {}
}
