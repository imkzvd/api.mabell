import { Event } from '../ports/event-bus.port';

export type AdminRefreshedPasswordPayload = {
  adminId: string;
  password: string;
};

export class AdminRefreshedPasswordEvent implements Event<AdminRefreshedPasswordPayload> {
  public readonly name = 'admin.refreshed-password';

  constructor(public readonly payload: AdminRefreshedPasswordPayload) {}
}
