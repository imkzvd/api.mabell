import { USER_MIN_LENGTH_PASSWORD } from '../constants';
import { UserFactory, UserWriteRepository } from '../../../../domain/components/user';
import { EventBus, IdService, PasswordService } from '../../../ports';
import { UserId } from '../../../../domain/components/user/types';
import { UserCreatedEvent } from '../../../events';
import { prepareUserEventPayload } from '../utils/prepare-user-event-payload.utility';

export class UserCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: UserWriteRepository,
    private readonly _idService: IdService,
    private readonly _passwordService: PasswordService,
  ) {}

  async create(): Promise<UserId> {
    const generatedId = this._idService.generate<UserId>();
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

    this._EB.publish(new UserCreatedEvent(prepareUserEventPayload(createdUser)));

    return createdUser.getId();
  }
}
