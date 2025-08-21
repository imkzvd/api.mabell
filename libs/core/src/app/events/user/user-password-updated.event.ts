import { Event } from '../../ports/event-bus/types';
import { UserId } from '../../../domain/components/user/types';

export type UserPasswordUpdatedEventPayload = {
  id: UserId;
};

export class UserPasswordUpdatedEvent extends Event<UserPasswordUpdatedEventPayload> {
  public readonly name = 'user.password-updated';

  constructor(public readonly payload: UserPasswordUpdatedEventPayload) {
    super();
  }
}
