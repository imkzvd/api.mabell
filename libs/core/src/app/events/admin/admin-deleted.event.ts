import { Event } from '../../ports';
import { AdminId } from '../../../../domain/components/admin';

export type AdminDeletedEventPayload = {
  id: AdminId;
};

export class AdminDeletedEvent extends Event<AdminDeletedEventPayload> {
  public readonly name = 'admin.deleted';

  constructor(public readonly payload: AdminDeletedEventPayload) {
    super();
  }
}
