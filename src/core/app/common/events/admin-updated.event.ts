import { Event } from '../ports/event-bus.port';
import { AdminDTO } from '../../../domain/components/admin/repository/dtos/admin.dto';

export type AdminUpdatedPayload = {
  admin: AdminDTO;
};

export class AdminUpdatedEvent implements Event<AdminUpdatedPayload> {
  public readonly name = 'admin.updated';

  constructor(public readonly payload: AdminUpdatedPayload) {}
}
