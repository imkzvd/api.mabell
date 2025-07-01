import { Event } from '../ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserEmailUpdatedPayload = {
  id: UserId;
};

export class UserEmailUpdatedEvent implements Event<UserEmailUpdatedPayload> {
  public readonly name = 'user.email-updated';

  constructor(public readonly payload: UserEmailUpdatedPayload) {}
}
