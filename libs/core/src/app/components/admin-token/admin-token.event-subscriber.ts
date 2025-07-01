import { AdminTokenService } from './admin-token.service';
import { EventBus } from '../../common/ports/event-bus.port';
import { AdminDeletedEvent } from '../../common/events/admin-deleted.event';
import { AdminBlockedEvent } from '../../common/events/admin-blocked.event';

export class AdminTokenEventSubscriber {
  constructor(
    private readonly _EB: EventBus,
    private readonly _adminTokenService: AdminTokenService,
  ) {
    this._EB.subscribe(AdminDeletedEvent, ({ id }) => {
      void this._adminTokenService.deleteRefreshTokensByAdminId(id);
    });

    this._EB.subscribe(AdminBlockedEvent, ({ id }) => {
      void this._adminTokenService.deleteRefreshTokensByAdminId(id);
    });
  }
}
