import { Event } from '@core/app/common/ports/event-bus.port';
import { AdminId } from '@core/domain/components/admin/types';

export type AdminUnblockedEventPayload = {
  id: AdminId;
};

export class AdminUnblockedEvent extends Event<AdminUnblockedEventPayload> {
  public readonly name = 'admin.unblocked';

  constructor(public readonly payload: AdminUnblockedEventPayload) {
    super();
  }
}
