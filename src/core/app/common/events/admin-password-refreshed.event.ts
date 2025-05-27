import { Event } from '../ports/event-bus.port';
import { AdminId } from '../../../domain/components/admin/types';

export type AdminPasswordRefreshedPayload = {
  id: AdminId;
  password: string;
};

export class AdminPasswordRefreshedEvent implements Event<AdminPasswordRefreshedPayload> {
  public readonly name = 'admin.password-refreshed';

  constructor(public readonly payload: AdminPasswordRefreshedPayload) {}
}
