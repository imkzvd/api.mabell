import { Event } from '../ports/event-bus.port';

export type UserRegisteredPayload = {
  id: string;
};

export class UserRegisteredEvent implements Event<UserRegisteredPayload> {
  public readonly name = 'user.registered';

  constructor(public readonly payload: UserRegisteredPayload) {}
}
