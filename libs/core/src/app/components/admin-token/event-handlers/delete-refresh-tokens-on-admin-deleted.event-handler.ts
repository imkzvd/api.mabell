import { AdminTokenDeleteService } from '../services/admin-token-delete.service';
import { EventHandler } from '../../../ports/event-bus/types';
import { AdminDeletedEvent } from '../../../events';

export class DeleteRefreshTokensOnAdminDeletedEventHandler extends EventHandler<AdminDeletedEvent> {
  constructor(private readonly _service: AdminTokenDeleteService) {
    super();
  }

  handle({ payload }: AdminDeletedEvent) {
    void this._service.deleteRefreshTokensByAdminId(payload.id);
  }
}
