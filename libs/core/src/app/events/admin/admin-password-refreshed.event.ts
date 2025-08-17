import { Event } from '../../ports';
import { AdminId } from '../../../../domain/components/admin';

export type AdminPasswordRefreshedEventPayload = {
  id: AdminId;
  password: string;
};

export class AdminPasswordRefreshedEvent extends Event<AdminPasswordRefreshedEventPayload> {
  public readonly name = 'admin.password-refreshed';

  constructor(public readonly payload: AdminPasswordRefreshedEventPayload) {
    super();
  }
}
