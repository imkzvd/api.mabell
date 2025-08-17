import { Event } from '../../ports';
import { UserId } from '../../../../domain/components/user';

export type UserPasswordRefreshedEventPayload = {
  id: UserId;
  password: string;
};

export class UserPasswordRefreshedEvent extends Event<UserPasswordRefreshedEventPayload> {
  public readonly name = 'user.password-refreshed';

  constructor(public readonly payload: UserPasswordRefreshedEventPayload) {
    super();
  }
}
