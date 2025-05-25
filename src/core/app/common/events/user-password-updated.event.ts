import { Event } from '../ports/event-bus.port';

export type UserPasswordUpdatedPayload = {
  id: string;
};

export class UserPasswordUpdatedEvent implements Event<UserPasswordUpdatedPayload> {
  public readonly name = 'user.password-updated';

  constructor(public readonly payload: UserPasswordUpdatedPayload) {}
}
