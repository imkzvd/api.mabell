import { Event } from '../../ports';
import { AdminId } from '../../../../domain/components/admin';

export type AdminUnblockedEventPayload = {
  id: AdminId;
};

export class AdminUnblockedEvent extends Event<AdminUnblockedEventPayload> {
  public readonly name = 'admin.unblocked';

  constructor(public readonly payload: AdminUnblockedEventPayload) {
    super();
  }
}
