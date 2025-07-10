import { NotFoundException } from '@core/shared/exceptions';
import { UserWriteRepository } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserId } from '@core/domain/components/user/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { UserFileStorage } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { UserDeletedEvent } from '@core/app/common/events/user-deleted.event';

export class UserDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: UserWriteRepository,
    private readonly _FS: UserFileStorage,
  ) {}

  async delete(id: string): Promise<UserId> {
    const deletedUserId = await this._WR.deleteById(id);

    if (!deletedUserId) {
      throw new NotFoundException('User does not exist');
    }

    await this._FS.deleteUserDirectory(deletedUserId);
    this._EB.publish(new UserDeletedEvent({ id: deletedUserId }));

    return deletedUserId;
  }
}
