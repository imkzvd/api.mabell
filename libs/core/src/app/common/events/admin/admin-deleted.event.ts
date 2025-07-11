import { Event } from '@core/app/common/ports/event-bus.port';
import { AdminId } from '@core/domain/components/admin/types';

export type AdminDeletedEventPayload = {
  id: AdminId;
};

export class AdminDeletedEvent extends Event<AdminDeletedEventPayload> {
  public readonly name = 'admin.deleted';

  constructor(public readonly payload: AdminDeletedEventPayload) {
    super();
  }
}
