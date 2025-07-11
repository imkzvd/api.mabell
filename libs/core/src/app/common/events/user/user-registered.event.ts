import { Event } from '@core/app/common/ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

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
