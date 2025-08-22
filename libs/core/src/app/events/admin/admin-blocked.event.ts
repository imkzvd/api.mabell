import { Event } from '../../ports/event-bus/types';
import { AdminId } from '../../../domain/components/admin/types';

export type AdminBlockedEventPayload = {
  id: AdminId;
};

export class AdminBlockedEvent extends Event<AdminBlockedEventPayload> {
  public readonly name = 'admin.blocked';

  constructor(public readonly payload: AdminBlockedEventPayload) {
    super();
  }
}
