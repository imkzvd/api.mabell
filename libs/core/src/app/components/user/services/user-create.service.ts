import { UserFactory } from '@core/domain/components/user/user.factory';
import { UserWriteRepository } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserId } from '@core/domain/components/user/types';
import { USER_MIN_LENGTH_PASSWORD } from '../constants';
import { IdService } from '../../../common/ports/id.service.port';
import { PasswordService } from '../../../common/ports/password-service.port';
import { EventBus } from '../../../common/ports/event-bus.port';
import { UserCreatedEvent } from '../../../common/events/user-created.event';

export class UserCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: UserWriteRepository,
    private readonly _idService: IdService<UserId>,
    private readonly _passwordService: PasswordService,
  ) {}

  async create(): Promise<UserId> {
    const generatedId = this._idService.generate();
    const { hashPassword } = await this._passwordService.generate({
      length: USER_MIN_LENGTH_PASSWORD,
      hash: true,
    });
    const nextUserIndex = await this._WR.getNextIndex();
    const createdUser = UserFactory.create({
      id: generatedId,
      username: `user${nextUserIndex}`,
      password: hashPassword,
      name: `User #${nextUserIndex}`,
    });

    await this._WR.save(createdUser);
    this._EB.publish(new UserCreatedEvent({ id: generatedId }));

    return generatedId;
  }
}
