import { Inject } from '@nestjs/common';
import { EventBus } from '@api.mabell/event-bus';
import { App } from '@api.mabell/core';

export class AdminTokenEventSubscriber {
  constructor(
    @Inject(EventBus) private readonly _EB: App.Ports.EventBus,
    @Inject(App.Components.AdminToken.AdminTokenDeleteService)
    private readonly _service: App.Components.AdminToken.AdminTokenDeleteService,
  ) {
    const deleteRefreshTokensOnAdminBlockedEventHandler =
      new App.Components.AdminToken.DeleteRefreshTokensOnAdminBlockedEventHandler(this._service);
    const deleteRefreshTokensOnAdminDeletedEventHandler =
      new App.Components.AdminToken.DeleteRefreshTokensOnAdminDeletedEventHandler(this._service);

    this._EB.subscribe(App.Events.AdminBlockedEvent, deleteRefreshTokensOnAdminBlockedEventHandler);
    this._EB.subscribe(App.Events.AdminDeletedEvent, deleteRefreshTokensOnAdminDeletedEventHandler);
  }
}
