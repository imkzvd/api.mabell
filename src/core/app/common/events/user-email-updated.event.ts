import { Event } from '../ports/event-bus.port';

export type UserEmailUpdatedPayload = {
  id: string;
};

export class UserEmailUpdatedEvent implements Event<UserEmailUpdatedPayload> {
  public readonly name = 'user.email-updated';

  constructor(public readonly payload: UserEmailUpdatedPayload) {}
}
