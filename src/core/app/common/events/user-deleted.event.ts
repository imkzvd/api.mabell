import { Event } from '../ports/event-bus.port';
import { UserId } from '../../../domain/components/user/types';

export type UserDeletedPayload = {
  id: UserId;
};

export class UserDeletedEvent implements Event<UserDeletedPayload> {
  public readonly name = 'user.deleted';

  constructor(public readonly payload: UserDeletedPayload) {}
}
