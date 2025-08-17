import { Event } from '../../ports';
import { UserId } from '../../../../domain/components/user';

export type UserUpdatedEventPayload = {
  id: UserId;
  name: string;
  email: string | null;
  avatar: string | null;
};

export class UserUpdatedEvent extends Event<UserUpdatedEventPayload> {
  public readonly name = 'user.updated';

  constructor(public readonly payload: UserUpdatedEventPayload) {
    super();
  }
}
