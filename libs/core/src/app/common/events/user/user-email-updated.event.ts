import { Event } from '@core/app/common/ports/event-bus.port';
import { UserId } from '@core/domain/components/user/types';

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
