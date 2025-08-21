import { UserTokenDeleteService } from '../services/user-token-delete.service';
import { EventHandler } from '../../../ports/event-bus/types';
import { UserDeletedEvent } from '../../../events';

export class DeleteRefreshTokensOnUserDeletedEventHandler extends EventHandler<UserDeletedEvent> {
  constructor(private readonly _service: UserTokenDeleteService) {
    super();
  }

  handle({ payload }: UserDeletedEvent) {
    void this._service.deleteRefreshTokensByUserId(payload.id);
  }
}
