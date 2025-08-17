import { Event } from '../../ports';
import { AdminId } from '../../../../domain/components/admin';

export type AdminBlockedEventPayload = {
  id: AdminId;
};

export class AdminBlockedEvent extends Event<AdminBlockedEventPayload> {
  public readonly name = 'admin.blocked';

  constructor(public readonly payload: AdminBlockedEventPayload) {
    super();
  }
}
