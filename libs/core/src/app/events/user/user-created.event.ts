import { Event } from '../../ports/event-bus/types';
import { UserEventPayload } from './types';

export class UserCreatedEvent extends Event<UserEventPayload> {
  public readonly name = 'user.created';

  constructor(public readonly payload: UserEventPayload) {
    super();
  }
}
