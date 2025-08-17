import { Event } from '../../ports';
import { UserId } from '../../../../domain/components/user';

export type UserCreatedEventPayload = {
  id: UserId;
  name: string;
  email: string | null;
  avatar: string | null;
};

export class UserCreatedEvent extends Event<UserCreatedEventPayload> {
  public readonly name = 'user.created';

  constructor(public readonly payload: UserCreatedEventPayload) {
    super();
  }
}
