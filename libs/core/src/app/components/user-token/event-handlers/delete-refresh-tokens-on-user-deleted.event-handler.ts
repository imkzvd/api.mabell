import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { UserDeletedEvent } from '@core/app/common/events/user/user-deleted.event';
import { UserTokenDeleteService } from '@core/app/components/user-token/services/user-token-delete.service';

export class DeleteRefreshTokensOnUserDeletedEventHandler extends EventHandler<UserDeletedEvent> {
  constructor(private readonly _service: UserTokenDeleteService) {
    super();
  }

  handle({ payload }: UserDeletedEvent) {
    void this._service.deleteRefreshTokensByUserId(payload.id);
  }
}
