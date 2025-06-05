import { Event } from '../ports/event-bus.port';
import { UserId } from '../../../domain/components/user/types';

export type UserUpdatedPayload = {
  id: UserId;
};

export class UserUpdatedEvent implements Event<UserUpdatedPayload> {
  public readonly name = 'user.updated';

  constructor(public readonly payload: UserUpdatedPayload) {}
}
