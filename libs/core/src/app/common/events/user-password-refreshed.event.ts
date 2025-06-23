import { Event } from '../ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

export type UserPasswordRefreshedPayload = {
  id: UserId;
  password: string;
};

export class UserPasswordRefreshedEvent implements Event<UserPasswordRefreshedPayload> {
  public readonly name = 'user.password-refreshed';

  constructor(public readonly payload: UserPasswordRefreshedPayload) {}
}
