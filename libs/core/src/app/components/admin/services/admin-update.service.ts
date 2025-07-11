import { DuplicationException, NotFoundException } from '@core/shared/exceptions';
import { AdminWriteRepository } from '@core/domain/components/admin/repository/admin-write-repository.port';
import { AdminId } from '@core/domain/components/admin/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { PasswordService } from '@core/app/common/ports/password-service.port';
import { AdminBlockedEvent } from '@core/app/common/events/admin/admin-blocked.event';
import { AdminUnblockedEvent } from '@core/app/common/events/admin/admin-unblocked.event';
import { AdminUpdatedEvent } from '@core/app/common/events/admin/admin-updated.event';
import { AdminPasswordRefreshedEvent } from '@core/app/common/events/admin/admin-password-refreshed.event';
import { ADMIN_PASSWORD_LENGTH } from '../constants';
import { UpdateAdminPayload } from '../types';

export class AdminUpdateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AdminWriteRepository,
    private readonly _passwordService: PasswordService,
  ) {}

  async update(id: string, payload: UpdateAdminPayload): Promise<AdminId> {
    const foundAdmin = await this._WR.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    if (payload.name) {
      foundAdmin.updateName(payload.name);
    }

    if (payload.role) {
      foundAdmin.updateRole(payload.role);
    }

    if (typeof payload.isBlocked === 'boolean') {
      foundAdmin.updateBlockedStatus(payload.isBlocked);

      this._EB.publish(
        payload.isBlocked
          ? new AdminBlockedEvent({ id: foundAdmin.getId() })
          : new AdminUnblockedEvent({ id: foundAdmin.getId() }),
      );
    }

    await this._WR.save(foundAdmin);
    this._EB.publish(new AdminUpdatedEvent({ id: foundAdmin.getId() }));

    return foundAdmin.getId();
  }

  async updateUsername(id: string, username: string): Promise<AdminId> {
    const foundAdmin = await this._WR.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException(`Admin does not exist`);
    }

    const existsAdminId = await this._WR.existsByUsername(username);

    if (existsAdminId) {
      throw new DuplicationException(`The admin with this username already exist`);
    }

    foundAdmin.updateUsername(username);
    await this._WR.save(foundAdmin);
    this._EB.publish(new AdminUpdatedEvent({ id: foundAdmin.getId() }));

    return foundAdmin.getId();
  }

  async refreshPassword(id: string): Promise<{ id: AdminId; password: string }> {
    const foundAdmin = await this._WR.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    const { password, hashPassword } = await this._passwordService.generate({
      length: ADMIN_PASSWORD_LENGTH,
      hash: true,
    });
    foundAdmin.updatePassword(hashPassword);

    await this._WR.save(foundAdmin);
    this._EB.publish(new AdminPasswordRefreshedEvent({ id: foundAdmin.getId(), password }));

    return { id: foundAdmin.getId(), password };
  }
}
