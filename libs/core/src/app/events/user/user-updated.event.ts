import { Event } from '../../ports/event-bus/types';
import { UserEventPayload } from './types';

export class UserUpdatedEvent extends Event<UserEventPayload> {
  public readonly name = 'user.updated';

  constructor(public readonly payload: UserEventPayload) {
    super();
  }
}
