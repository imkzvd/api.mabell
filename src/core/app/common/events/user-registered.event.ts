import { Event } from '../ports/event-bus.port';
import { UserId } from '../../../domain/components/user/types';

export type UserRegisteredPayload = {
  id: UserId;
};

export class UserRegisteredEvent implements Event<UserRegisteredPayload> {
  public readonly name = 'user.registered';

  constructor(public readonly payload: UserRegisteredPayload) {}
}
