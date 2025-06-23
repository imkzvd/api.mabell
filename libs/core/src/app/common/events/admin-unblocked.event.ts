import { Event } from '../ports/event-bus.port';
import { AdminId } from '../../../domain/components/admin/types';

export type AdminUnblockedPayload = {
  id: AdminId;
};

export class AdminUnblockedEvent implements Event<AdminUnblockedPayload> {
  public readonly name = 'admin.unblocked';

  constructor(public readonly payload: AdminUnblockedPayload) {}
}
