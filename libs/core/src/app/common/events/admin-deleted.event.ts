import { Event } from '../ports/event-bus.port';
import { AdminId } from '@core/domain/components/admin/types';

export type AdminDeletedPayload = {
  id: AdminId;
};

export class AdminDeletedEvent implements Event<AdminDeletedPayload> {
  public readonly name = 'admin.deleted';

  constructor(public readonly payload: AdminDeletedPayload) {}
}
