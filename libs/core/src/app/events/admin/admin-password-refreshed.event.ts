import { Event } from '../../ports/event-bus/types';
import { AdminId } from '../../../domain/components/admin/types';

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
