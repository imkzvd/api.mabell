import { Event } from '@core/app/common/ports/event-bus.port';
import { AdminId } from '@core/domain/components/admin/types';

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
