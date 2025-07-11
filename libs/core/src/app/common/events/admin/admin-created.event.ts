import { Event } from '@core/app/common/ports/event-bus.port';
import { AdminId } from '@core/domain/components/admin/types';

export type AdminCreatedEventPayload = {
  id: AdminId;
};

export class AdminCreatedEvent extends Event<AdminCreatedEventPayload> {
  public readonly name = 'admin.created';

  constructor(public readonly payload: AdminCreatedEventPayload) {
    super();
  }
}
