import { Event } from '../ports/event-bus.port';

export type UserCreatedPayload = {
  id: string;
};

export class UserCreatedEvent implements Event<UserCreatedPayload> {
  public readonly name = 'user.created';

  constructor(public readonly payload: UserCreatedPayload) {}
}
