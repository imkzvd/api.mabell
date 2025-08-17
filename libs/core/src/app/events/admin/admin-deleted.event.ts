import { Event } from '../../ports/event-bus/types';
import { AdminId } from '../../../domain/components/admin/types';

export type AdminDeletedEventPayload = {
  id: AdminId;
};

export class AdminDeletedEvent extends Event<AdminDeletedEventPayload> {
  public readonly name = 'admin.deleted';

  constructor(public readonly payload: AdminDeletedEventPayload) {
    super();
  }
}
