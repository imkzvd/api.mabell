import { AdminTokenDeleteService } from '../services/admin-token-delete.service';
import { EventHandler } from '../../../ports/event-bus/types';
import { AdminBlockedEvent } from '../../../events';

export class DeleteRefreshTokensOnAdminBlockedEventHandler extends EventHandler<AdminBlockedEvent> {
  constructor(private readonly _service: AdminTokenDeleteService) {
    super();
  }

  handle({ payload }: AdminBlockedEvent) {
    void this._service.deleteRefreshTokensByAdminId(payload.id);
  }
}
