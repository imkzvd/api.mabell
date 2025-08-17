import { Event } from '../../ports';
import { UserId } from '../../../../domain/components/user';

export type UserEmailUpdatedEventPayload = {
  id: UserId;
  name: string;
  email: string | null;
  avatar: string | null;
};

export class UserEmailUpdatedEvent extends Event<UserEmailUpdatedEventPayload> {
  public readonly name = 'user.email-updated';

  constructor(public readonly payload: UserEmailUpdatedEventPayload) {
    super();
  }
}
