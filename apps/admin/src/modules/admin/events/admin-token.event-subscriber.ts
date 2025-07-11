import { Inject } from '@nestjs/common';
import { EventBus } from '@infrastructure/event-bus';
import { DeleteRefreshTokensOnAdminBlockedEventHandler } from '@core/app/components/admin-token/event-handlers/delete-refresh-tokens-on-admin-blocked.event-handler';
import { AdminBlockedEvent } from '@core/app/common/events/admin/admin-blocked.event';
import { AdminTokenDeleteService } from '@core/app/components/admin-token/services/admin-token-delete.service';
import { DeleteRefreshTokensOnAdminDeletedEventHandler } from '@core/app/components/admin-token/event-handlers/delete-refresh-tokens-on-admin-deleted.event-handler';
import { AdminDeletedEvent } from '@core/app/common/events/admin/admin-deleted.event';

export class AdminTokenEventSubscriber {
  constructor(
    @Inject(EventBus) private readonly _EB: EventBus,
    @Inject(AdminTokenDeleteService) private readonly _service: AdminTokenDeleteService,
  ) {
    const deleteRefreshTokensOnAdminBlockedEventHandler =
      new DeleteRefreshTokensOnAdminBlockedEventHandler(this._service);
    const deleteRefreshTokensOnAdminDeletedEventHandler =
      new DeleteRefreshTokensOnAdminDeletedEventHandler(this._service);

    this._EB.subscribe(AdminBlockedEvent, deleteRefreshTokensOnAdminBlockedEventHandler);
    this._EB.subscribe(AdminDeletedEvent, deleteRefreshTokensOnAdminDeletedEventHandler);
  }
}
