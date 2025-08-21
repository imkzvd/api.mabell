import { Event } from '../../ports/event-bus/types';
import { UserEventPayload } from './types';

export class UserEmailUpdatedEvent extends Event<UserEventPayload> {
  public readonly name = 'user.email-updated';

  constructor(public readonly payload: UserEventPayload) {
    super();
  }
}
