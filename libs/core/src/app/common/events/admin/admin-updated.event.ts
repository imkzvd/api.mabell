import { Event } from '@core/app/common/ports/event-bus.port';
import { AdminId } from '@core/domain/components/admin/types';

export type AdminUpdatedEventPayload = {
  id: AdminId;
};

export class AdminUpdatedEvent extends Event<AdminUpdatedEventPayload> {
  public readonly name = 'admin.updated';

  constructor(public readonly payload: AdminUpdatedEventPayload) {
    super();
  }
}
