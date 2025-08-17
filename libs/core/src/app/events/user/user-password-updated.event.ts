import { Event } from '../../ports';
import { UserId } from '../../../../domain/components/user';

export type UserPasswordUpdatedEventPayload = {
  id: UserId;
};

export class UserPasswordUpdatedEvent extends Event<UserPasswordUpdatedEventPayload> {
  public readonly name = 'user.password-updated';

  constructor(public readonly payload: UserPasswordUpdatedEventPayload) {
    super();
  }
}
