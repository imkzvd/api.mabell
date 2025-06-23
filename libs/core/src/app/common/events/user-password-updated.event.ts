import { Event } from '../ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserPasswordUpdatedPayload = {
  id: UserId;
};

export class UserPasswordUpdatedEvent implements Event<UserPasswordUpdatedPayload> {
  public readonly name = 'user.password-updated';

  constructor(public readonly payload: UserPasswordUpdatedPayload) {}
}
