import { Event } from '@core/app/common/ports/event-bus.port';
import { AdminId } from '@core/domain/components/admin/types';

export type AdminBlockedEventPayload = {
  id: AdminId;
};

export class AdminBlockedEvent extends Event<AdminBlockedEventPayload> {
  public readonly name = 'admin.blocked';

  constructor(public readonly payload: AdminBlockedEventPayload) {
    super();
  }
}
