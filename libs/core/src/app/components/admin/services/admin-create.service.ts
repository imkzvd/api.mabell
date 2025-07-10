import { AdminWriteRepository } from '@core/domain/components/admin/repository/admin-write-repository.port';
import { AdminFactory } from '@core/domain/components/admin/admin.factory';
import { AdminId } from '@core/domain/components/admin/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { IdService } from '@core/app/common/ports/id.service.port';
import { PasswordService } from '@core/app/common/ports/password-service.port';
import { AdminCreatedEvent } from '@core/app/common/events/admin-created.event';
import { ADMIN_PASSWORD_LENGTH } from '../constants';

export class AdminCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AdminWriteRepository,
    private readonly _idService: IdService<AdminId>,
    private readonly _passwordService: PasswordService,
  ) {}

  async create(): Promise<AdminId> {
    const generatedId = this._idService.generate();
    const { hashPassword } = await this._passwordService.generate({
      length: ADMIN_PASSWORD_LENGTH,
      hash: true,
    });

    const nextAdminIndex = await this._WR.getNextIndex();
    const createdAdmin = AdminFactory.create({
      id: generatedId,
      username: `account${nextAdminIndex}`,
      password: hashPassword,
      name: `Account #${nextAdminIndex}`,
    });

    await this._WR.save(createdAdmin);
    this._EB.publish(new AdminCreatedEvent({ id: generatedId }));

    return createdAdmin.getId();
  }
}
