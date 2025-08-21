import { Event } from '../../ports/event-bus/types';
import { UserId } from '../../../domain/components/user/types';

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
