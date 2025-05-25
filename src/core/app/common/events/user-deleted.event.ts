import { Event } from '../ports/event-bus.port';

export type UserDeletedPayload = {
  id: string;
};

export class UserDeletedEvent implements Event<UserDeletedPayload> {
  public readonly name = 'user.deleted';

  constructor(public readonly payload: UserDeletedPayload) {}
}
