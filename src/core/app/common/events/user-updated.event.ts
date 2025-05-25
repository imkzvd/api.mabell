import { Event } from '../ports/event-bus.port';

export type UserUpdatedPayload = {
  id: string;
};

export class UserUpdatedEvent implements Event<UserUpdatedPayload> {
  public readonly name = 'user.updated';

  constructor(public readonly payload: UserUpdatedPayload) {}
}
