import { Event } from '../ports/event-bus.port';
import { AdminId } from '../../../domain/components/admin/types';

export type AdminCreatedPayload = {
  id: AdminId;
};

export class AdminCreatedEvent implements Event<AdminCreatedPayload> {
  public readonly name = 'admin.created';

  constructor(public readonly payload: AdminCreatedPayload) {}
}
