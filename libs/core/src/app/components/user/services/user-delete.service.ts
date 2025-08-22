import { UserWriteRepository } from '../../../../domain/components/user';
import { NotFoundException } from '../../../../shared/exceptions';
import { EventBus, UserFileStorage } from '../../../ports';
import { UserId } from '../../../../domain/components/user/types';
import { UserDeletedEvent } from '../../../events';

export class UserDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: UserWriteRepository,
    private readonly _FS: UserFileStorage,
  ) {}

  async deleteById(userId: string): Promise<UserId> {
    const deletedUserId = await this._WR.deleteById(userId);

    if (!deletedUserId) {
      throw new NotFoundException('User does not exist');
    }

    await this._FS.deleteUserDirectory(deletedUserId);

    this._EB.publish(new UserDeletedEvent({ id: deletedUserId }));

    return deletedUserId;
  }
}
