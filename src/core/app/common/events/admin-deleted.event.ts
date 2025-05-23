import { Event } from '../ports/event-bus.port';

export type AdminDeletedPayload = {
  adminId: string;
};

export class AdminDeletedEvent implements Event<AdminDeletedPayload> {
  public readonly name = 'admin.deleted';

  constructor(public readonly payload: AdminDeletedPayload) {}
}
