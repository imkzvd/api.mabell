import { BadRequestException } from '@core/shared/exceptions';
import { UserFactory } from '@core/domain/components/user/user.factory';
import { UserWriteRepository } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserId } from '@core/domain/components/user/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { IdService } from '@core/app/common/ports/id.service.port';
import { PasswordService } from '@core/app/common/ports/password-service.port';
import { UserRegisteredEvent } from '@core/app/common/events/user/user-registered.event';
import { USER_MIN_LENGTH_PASSWORD } from '../constants';
import { RegisterUserPayload } from '../types';

export class UserRegistrationService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: UserWriteRepository,
    private readonly _idService: IdService<UserId>,
    private readonly _passwordService: PasswordService,
  ) {}

  async register(payload: RegisterUserPayload): Promise<UserId> {
    const generatedId = this._idService.generate();

    if (payload.password.length < USER_MIN_LENGTH_PASSWORD) {
      throw new BadRequestException('Password is invalid');
    }

    const hashedPassword = await this._passwordService.hash(payload.password);
    const createdUser = UserFactory.create({
      id: generatedId,
      username: payload.username,
      password: hashedPassword,
      name: payload.name,
      email: payload.email,
      birthDate: payload.birthDate,
      region: payload.region,
    });

    await this._WR.save(createdUser);
    this._EB.publish(
      new UserRegisteredEvent({
        id: generatedId,
        name: createdUser.getName().value,
        email: createdUser.getEmail()?.value || null,
        avatar: createdUser.getAvatar(),
      }),
    );

    return generatedId;
  }
}
