import { Event } from '../../ports/event-bus/types';
import { AdminId } from '../../../domain/components/admin/types';

export type AdminUpdatedEventPayload = {
  id: AdminId;
};

export class AdminUpdatedEvent extends Event<AdminUpdatedEventPayload> {
  public readonly name = 'admin.updated';

  constructor(public readonly payload: AdminUpdatedEventPayload) {
    super();
  }
}
