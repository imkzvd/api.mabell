import { Event } from '../ports/event-bus.port';

export type UserPasswordRefreshedPayload = {
  id: string;
  password: string;
};

export class UserPasswordRefreshedEvent implements Event<UserPasswordRefreshedPayload> {
  public readonly name = 'user.password-refreshed';

  constructor(public readonly payload: UserPasswordRefreshedPayload) {}
}
