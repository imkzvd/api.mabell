import { NotFoundException } from '@core/shared/exceptions';
import { UserWriteRepository } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserId } from '@core/domain/components/user/types';
import { UserFileStorage } from '../../../common/ports/file-storages/user-file-storage.port';
import { EventBus } from '../../../common/ports/event-bus.port';
import { UserDeletedEvent } from '../../../common/events/user-deleted.event';

export class UserDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: UserWriteRepository,
    private readonly _userFS: UserFileStorage,
  ) {}

  async delete(id: string): Promise<UserId> {
    const deletedUserId = await this._WR.deleteById(id);

    if (!deletedUserId) {
      throw new NotFoundException('User does not exist');
    }

    await this._userFS.deleteUserDirectory(deletedUserId);
    this._EB.publish(new UserDeletedEvent({ id: deletedUserId }));

    return deletedUserId;
  }
}
