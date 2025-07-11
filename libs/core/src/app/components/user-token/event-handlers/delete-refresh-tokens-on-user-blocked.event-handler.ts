import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { UserBlockedEvent } from '@core/app/common/events/user/user-blocked.event';
import { UserTokenDeleteService } from '@core/app/components/user-token/services/user-token-delete.service';

export class DeleteRefreshTokensOnUserBlockedEventHandler extends EventHandler<UserBlockedEvent> {
  constructor(private readonly _service: UserTokenDeleteService) {
    super();
  }

  handle({ payload }: UserBlockedEvent) {
    void this._service.deleteRefreshTokensByUserId(payload.id);
  }
}
