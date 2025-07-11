import { UserFactory } from '@core/domain/components/user/user.factory';
import { UserWriteRepository } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserId } from '@core/domain/components/user/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { IdService } from '@core/app/common/ports/id.service.port';
import { PasswordService } from '@core/app/common/ports/password-service.port';
import { UserCreatedEvent } from '@core/app/common/events/user/user-created.event';
import { USER_MIN_LENGTH_PASSWORD } from '../constants';

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
    this._EB.publish(
      new UserCreatedEvent({
        id: generatedId,
        name: createdUser.getName().value,
        email: createdUser.getEmail()?.value || null,
        avatar: createdUser.getAvatar(),
      }),
    );

    return generatedId;
  }
}
