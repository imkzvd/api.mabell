import { Event } from '../../ports/event-bus/types';
import { UserEventPayload } from './types';

export class UserRegisteredEvent extends Event<UserEventPayload> {
  public readonly name = 'user.registered';

  constructor(public readonly payload: UserEventPayload) {
    super();
  }
}
