import { Inject } from '@nestjs/common';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../common/ports/event-bus.port';
import { UserDeletedEvent } from '../../common/events/user-deleted.event';
import { UserBlockedEvent } from '../../common/events/user-blocked.event';
import { UserTokenService } from './user-token.service';

export class UserTokenEventSubscriber {
  constructor(
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
    @Inject(UserTokenService) private readonly _userTokenService: UserTokenService,
  ) {
    this._eb.subscribe(UserDeletedEvent, ({ id }) => {
      void this._userTokenService.deleteRefreshTokensByUserId(id);
    });

    this._eb.subscribe(UserBlockedEvent, ({ id }) => {
      void this._userTokenService.deleteRefreshTokensByUserId(id);
    });
  }
}
