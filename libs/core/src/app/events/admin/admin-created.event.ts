import { Event } from '../../ports';
import { AdminId } from '../../../../domain/components/admin';

export type AdminCreatedEventPayload = {
  id: AdminId;
};

export class AdminCreatedEvent extends Event<AdminCreatedEventPayload> {
  public readonly name = 'admin.created';

  constructor(public readonly payload: AdminCreatedEventPayload) {
    super();
  }
}
