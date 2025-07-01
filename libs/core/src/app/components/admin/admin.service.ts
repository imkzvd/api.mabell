import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import {
  BadRequestException,
  DuplicationException,
  NotFoundException,
} from '@core/shared/exceptions';
import { AdminWriteRepository } from '@core/domain/components/admin/repository/admin-write-repository.port';
import { AdminFactory } from '@core/domain/components/admin/admin.factory';
import { AdminRoles } from '@core/domain/components/admin/constants/admin-roles';
import { AdminId } from '@core/domain/components/admin/types';
import { AdminReadRepository } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { ADMIN_PASSWORD_LENGTH } from './constants';
import AdminMapper from './dtos/admin.mapper';
import { AdminDTO } from './dtos/admin.dto';
import { UpdateAdminPayload } from './types';
import { IdService } from '../../common/ports/id.service.port';
import { PasswordService } from '../../common/ports/password-service.port';
import { EventBus } from '../../common/ports/event-bus.port';
import { AdminCreatedEvent } from '../../common/events/admin-created.event';
import { AdminUpdatedEvent } from '../../common/events/admin-updated.event';
import { AdminDeletedEvent } from '../../common/events/admin-deleted.event';
import { AdminPasswordRefreshedEvent } from '../../common/events/admin-password-refreshed.event';
import { AdminBlockedEvent } from '../../common/events/admin-blocked.event';
import { AdminUnblockedEvent } from '../../common/events/admin-unblocked.event';

export class AdminService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AdminWriteRepository,
    private readonly _RR: AdminReadRepository,
    private readonly _idService: IdService<AdminId>,
    private readonly _passwordService: PasswordService,
  ) {}

  async createAdmin(): Promise<AdminId> {
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

  async updateAdmin(id: string, payload: UpdateAdminPayload): Promise<AdminId> {
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

  async updateAdminUsername(id: string, username: string): Promise<AdminId> {
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

  async refreshAdminPassword(id: string): Promise<{ id: AdminId; password: string }> {
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

  async deleteAdmin(id: string): Promise<AdminId> {
    const foundAdmin = await this._WR.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    if (foundAdmin.getRole().value === AdminRoles.Owner) {
      throw new BadRequestException("You can't delete the owner.");
    }

    const deletedAdminId = await this._WR.deleteById(id);

    if (!deletedAdminId) {
      throw new NotFoundException('Admin does not exist');
    }

    this._EB.publish(new AdminDeletedEvent({ id: deletedAdminId }));

    return deletedAdminId;
  }

  async getAdmin(id: string): Promise<AdminDTO | null> {
    const foundAdmin = await this._RR.findById(id);

    return foundAdmin ? AdminMapper.toDTO(foundAdmin) : null;
  }

  async getAdmins(
    pagination?: OffsetLimitPaginationDTO,
  ): Promise<OffsetLimitPaginationResponseDTO<AdminDTO>> {
    const foundAdmins = await this._RR.find({
      pagination,
    });

    return new OffsetLimitPaginationResponseDTO(
      foundAdmins.items.map((dto) => AdminMapper.toDTO(dto)),
      foundAdmins.total,
      foundAdmins.limit,
      foundAdmins.offset,
      foundAdmins.hasMore,
    );
  }
}
