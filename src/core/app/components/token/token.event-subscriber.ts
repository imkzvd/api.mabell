import { Inject } from '@nestjs/common';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../common/ports/event-bus.port';
import { AdminDeletedEvent } from '../../common/events/admin-deleted.event';
import { TokenService } from './token.service';
import { AdminBlockedEvent } from '../../common/events/admin-blocked.event';
import { UserDeletedEvent } from '../../common/events/user-deleted.event';
import { UserBlockedEvent } from '../../common/events/user-blocked.event';

export class TokenEventSubscriber {
  constructor(
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
    @Inject() private readonly _tokenService: TokenService,
  ) {
    this._eb.subscribe(AdminDeletedEvent, ({ id }) => {
      void this._tokenService.deleteRefreshTokensByOwnerId(id);
    });

    this._eb.subscribe(AdminBlockedEvent, ({ id }) => {
      void this._tokenService.deleteRefreshTokensByOwnerId(id);
    });

    this._eb.subscribe(UserDeletedEvent, ({ id }) => {
      void this._tokenService.deleteRefreshTokensByOwnerId(id);
    });

    this._eb.subscribe(UserBlockedEvent, ({ id }) => {
      void this._tokenService.deleteRefreshTokensByOwnerId(id);
    });
  }
}
