import { Inject } from '@nestjs/common';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../common/ports/event-bus.port';
import { AdminDeletedEvent } from '../../common/events/admin-deleted.event';
import { AdminTokenService } from './admin-token.service';
import { AdminBlockedEvent } from '../../common/events/admin-blocked.event';

export class AdminTokenEventSubscriber {
  constructor(
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
    @Inject(AdminTokenService) private readonly _adminTokenService: AdminTokenService,
  ) {
    this._eb.subscribe(AdminDeletedEvent, ({ id }) => {
      void this._adminTokenService.deleteRefreshTokensByAdminId(id);
    });

    this._eb.subscribe(AdminBlockedEvent, ({ id }) => {
      void this._adminTokenService.deleteRefreshTokensByAdminId(id);
    });
  }
}
