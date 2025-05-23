import { Event } from '../ports/event-bus.port';
import { AdminDTO } from '../../../domain/components/admin/repository/dtos/admin.dto';

export type AdminCreatedPayload = {
  admin: AdminDTO;
};

export class AdminCreatedEvent implements Event<AdminCreatedPayload> {
  public readonly name = 'admin.created';

  constructor(public readonly payload: AdminCreatedPayload) {}
}
