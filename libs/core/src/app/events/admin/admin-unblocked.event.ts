import { Event } from '../../ports/event-bus/types';
import { AdminId } from '../../../domain/components/admin/types';

export type AdminUnblockedEventPayload = {
  id: AdminId;
};

export class AdminUnblockedEvent extends Event<AdminUnblockedEventPayload> {
  public readonly name = 'admin.unblocked';

  constructor(public readonly payload: AdminUnblockedEventPayload) {
    super();
  }
}
