import { ADMIN_PASSWORD_LENGTH } from '../constants';
import { UpdateAdminPayload } from '../types';
import { AdminWriteRepository } from '../../../../domain/components/admin';
import { DuplicationException, NotFoundException } from '../../../../shared/exceptions';
import {
  AdminBlockedEvent,
  AdminPasswordRefreshedEvent,
  AdminUnblockedEvent,
  AdminUpdatedEvent,
} from '../../../events';
import { EventBus, PasswordService } from '../../../ports';
import { AdminId } from '../../../../domain/components/admin/types';

export class AdminUpdateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AdminWriteRepository,
    private readonly _passwordService: PasswordService,
  ) {}

  async updateById(adminId: string, payload: UpdateAdminPayload): Promise<AdminId> {
    const foundAdmin = await this._WR.findById(adminId);

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

  async updateUsernameById(adminId: string, username: string): Promise<AdminId> {
    const foundAdmin = await this._WR.findById(adminId);

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

  async refreshPasswordById(adminId: string): Promise<{ id: AdminId; password: string }> {
    const foundAdmin = await this._WR.findById(adminId);

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
