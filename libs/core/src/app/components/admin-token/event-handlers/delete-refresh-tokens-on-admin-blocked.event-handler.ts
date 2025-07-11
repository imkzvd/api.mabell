import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { AdminBlockedEvent } from '@core/app/common/events/admin/admin-blocked.event';
import { AdminTokenDeleteService } from '@core/app/components/admin-token/services/admin-token-delete.service';

export class DeleteRefreshTokensOnAdminBlockedEventHandler extends EventHandler<AdminBlockedEvent> {
  constructor(private readonly _service: AdminTokenDeleteService) {
    super();
  }

  handle({ payload }: AdminBlockedEvent) {
    void this._service.deleteRefreshTokensByAdminId(payload.id);
  }
}
