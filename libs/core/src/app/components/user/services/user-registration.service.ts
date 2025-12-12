import { Domain } from '@api.mabell/core';
import { USER_MIN_LENGTH_PASSWORD } from '../constants';
import { RegisterUserPayload } from '../types';
import { UserFactory, UserWriteRepository } from '../../../../domain/components/user';
import { BadRequestException } from '../../../../shared/exceptions';
import { EventBus, IdService, PasswordService } from '../../../ports';
import { UserId } from '../../../../domain/components/user/types';
import { UserRegisteredEvent } from '../../../events';
import { prepareUserEventPayload } from '../utils/prepare-user-event-payload.utility';

export class UserRegistrationService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: UserWriteRepository,
    private readonly _idService: IdService,
    private readonly _passwordService: PasswordService,
  ) {}

  async register(payload: RegisterUserPayload): Promise<UserId> {
    const generatedId = this._idService.generate<UserId>();

    if (payload.password.length < USER_MIN_LENGTH_PASSWORD) {
      throw new BadRequestException('Password is invalid');
    }

    const hashedPassword = await this._passwordService.hash(payload.password);
    const createdUser = UserFactory.create({
      id: generatedId,
      username: payload.email,
      password: hashedPassword,
      name: payload.name,
      email: payload.email,
      birthDate: payload.birthDate,
      region: Domain.Common.Regions['Russian Federation'],
    });

    await this._WR.save(createdUser);

    this._EB.publish(new UserRegisteredEvent(prepareUserEventPayload(createdUser)));

    return createdUser.getId();
  }
}
