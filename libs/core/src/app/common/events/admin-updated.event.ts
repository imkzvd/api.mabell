import { Event } from '../ports/event-bus.port';
import { AdminId } from '@core/domain/components/admin/types';

export type AdminUpdatedPayload = {
  id: AdminId;
};

export class AdminUpdatedEvent implements Event<AdminUpdatedPayload> {
  public readonly name = 'admin.updated';

  constructor(public readonly payload: AdminUpdatedPayload) {}
}
