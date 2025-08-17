import { Event } from '../../ports';
import { AdminId } from '../../../../domain/components/admin';

export type AdminUpdatedEventPayload = {
  id: AdminId;
};

export class AdminUpdatedEvent extends Event<AdminUpdatedEventPayload> {
  public readonly name = 'admin.updated';

  constructor(public readonly payload: AdminUpdatedEventPayload) {
    super();
  }
}
