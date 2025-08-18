import { UserTokenDeleteService } from '../services/user-token-delete.service';
import { EventHandler } from '../../../ports/event-bus/types';
import { UserBlockedEvent } from '../../../events';

export class DeleteRefreshTokensOnUserBlockedEventHandler extends EventHandler<UserBlockedEvent> {
  constructor(private readonly _service: UserTokenDeleteService) {
    super();
  }

  handle({ payload }: UserBlockedEvent) {
    void this._service.deleteRefreshTokensByUserId(payload.id);
  }
}
