import { Event } from '../../ports/event-bus/types';
import { AdminId } from '../../../domain/components/admin/types';

export type AdminCreatedEventPayload = {
  id: AdminId;
};

export class AdminCreatedEvent extends Event<AdminCreatedEventPayload> {
  public readonly name = 'admin.created';

  constructor(public readonly payload: AdminCreatedEventPayload) {
    super();
  }
}
