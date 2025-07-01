import { UserTokenService } from './user-token.service';
import { EventBus } from '../../common/ports/event-bus.port';
import { UserDeletedEvent } from '../../common/events/user-deleted.event';
import { UserBlockedEvent } from '../../common/events/user-blocked.event';

export class UserTokenEventSubscriber {
  constructor(
    private readonly _EB: EventBus,
    private readonly _userTokenService: UserTokenService,
  ) {
    this._EB.subscribe(UserDeletedEvent, ({ id }) => {
      void this._userTokenService.deleteRefreshTokensByUserId(id);
    });

    this._EB.subscribe(UserBlockedEvent, ({ id }) => {
      void this._userTokenService.deleteRefreshTokensByUserId(id);
    });
  }
}
