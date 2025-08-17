import { Event } from '../../ports';
import { UserId } from '../../../../domain/components/user';

export type UserRegisteredEventEventPayload = {
  id: UserId;
  name: string;
  email: string | null;
  avatar: string | null;
};

export class UserRegisteredEvent extends Event<UserRegisteredEventEventPayload> {
  public readonly name = 'user.registered';

  constructor(public readonly payload: UserRegisteredEventEventPayload) {
    super();
  }
}
