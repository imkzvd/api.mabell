import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { AdminDeletedEvent } from '@core/app/common/events/admin/admin-deleted.event';
import { AdminTokenDeleteService } from '@core/app/components/admin-token/services/admin-token-delete.service';

export class DeleteRefreshTokensOnAdminDeletedEventHandler extends EventHandler<AdminDeletedEvent> {
  constructor(private readonly _service: AdminTokenDeleteService) {
    super();
  }

  handle({ payload }: AdminDeletedEvent) {
    void this._service.deleteRefreshTokensByAdminId(payload.id);
  }
}
