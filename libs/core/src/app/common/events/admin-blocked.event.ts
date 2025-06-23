import { Event } from '../ports/event-bus.port';
import { AdminId } from '@core/domain/components/admin/types';

export type AdminBlockedPayload = {
  id: AdminId;
};

export class AdminBlockedEvent implements Event<AdminBlockedPayload> {
  public readonly name = 'admin.blocked';

  constructor(public readonly payload: AdminBlockedPayload) {}
}
