import { Inject, NotFoundException } from '@nestjs/common';
import {
  ADMIN_WRITE_REPOSITORY_DI_TOKEN,
  AdminWriteRepository,
} from '../../../domain/components/admin/repository/admin-write-repository.port';
import { AdminFactory } from '../../../domain/components/admin/admin.factory';
import { ID_SERVICE_DI_TOKEN, IdService } from '../../common/ports/id-service.port';
import { AdminId } from '../../../domain/components/admin/admin.entity';
import { ADMIN_PASSWORD_LENGTH } from './constants';
import {
  PASSWORD_SERVICE_DI_TOKEN,
  PasswordService,
} from '../../common/ports/password-service.port';
import { AdminRoles } from '../../../domain/components/admin/constants/admin-roles';
import { BadRequestException, DuplicationException } from '../../../shared/exceptions';
import AdminMapper from './dtos/admin.mapper';
import {
  ADMIN_READ_REPOSITORY_DI_TOKEN,
  AdminReadRepository,
} from '../../../domain/components/admin/repository/admin-read-repository.port';
import { OffsetLimitPaginationResponseDTO } from '../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { AdminDTO } from './dtos/admin.dto';
import { UpdateAdminPayload } from './types';

export class AdminService {
  constructor(
    @Inject(ADMIN_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _wr: AdminWriteRepository,
    @Inject(ADMIN_READ_REPOSITORY_DI_TOKEN)
    private readonly _rr: AdminReadRepository,
    @Inject(ID_SERVICE_DI_TOKEN)
    private readonly _idService: IdService<AdminId>,
    @Inject(PASSWORD_SERVICE_DI_TOKEN)
    private readonly _passwordService: PasswordService,
  ) {}

  async createAdmin(): Promise<AdminDTO> {
    const generatedId = this._idService.generate();
    const { hashPassword } = await this._passwordService.generate({
      length: ADMIN_PASSWORD_LENGTH,
      hash: true,
    });

    const nextAdminIndex = await this._wr.getNextIndex();
    const createdAdminEntity = AdminFactory.create({
      id: generatedId,
      username: `guest${nextAdminIndex}`,
      password: hashPassword,
      name: `Guest #${nextAdminIndex}`,
    });

    await this._wr.save(createdAdminEntity);

    return this.getAdmin(createdAdminEntity.getId()) as Promise<AdminDTO>;
  }

  async updateAdmin(id: string, payload: UpdateAdminPayload): Promise<AdminDTO> {
    const foundAdmin = await this._wr.findById(id);

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
    }

    await this._wr.save(foundAdmin);

    const updatedAdmin = await this.getAdmin(id);

    if (!updatedAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    return updatedAdmin;
  }

  async updateAdminUsername(id: string, username: string): Promise<AdminDTO> {
    const foundAdmin = await this._wr.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException(`Admin does not exist`);
    }

    const existsAdminId = await this._wr.existsByUsername(username);

    if (existsAdminId) {
      throw new DuplicationException(`The admin with this username already exist`);
    }

    foundAdmin.updateUsername(username);

    await this._wr.save(foundAdmin);

    const updatedAdmin = await this.getAdmin(id);

    if (!updatedAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    return updatedAdmin;
  }

  async refreshAdminPassword(id: string): Promise<{ password: string }> {
    const foundAdmin = await this._wr.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    const { password, hashPassword } = await this._passwordService.generate({
      length: ADMIN_PASSWORD_LENGTH,
      hash: true,
    });
    foundAdmin.updatePassword(hashPassword);

    await this._wr.save(foundAdmin);

    return {
      password,
    };
  }

  async deleteAdmin(id: string): Promise<string> {
    const foundAdmin = await this._wr.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    if (foundAdmin.getRole().value === AdminRoles.Owner) {
      throw new BadRequestException("You can't delete the owner.");
    }

    const deletedAdminId = await this._wr.deleteById(id);

    if (!deletedAdminId) {
      throw new NotFoundException('Admin does not exist');
    }

    return deletedAdminId;
  }

  async getAdmin(id: string): Promise<AdminDTO | null> {
    const foundAdmin = await this._rr.findById(id);

    return foundAdmin ? AdminMapper.toDTO(foundAdmin) : null;
  }

  async getAdmins(
    pagination?: OffsetLimitPaginationDTO,
  ): Promise<OffsetLimitPaginationResponseDTO<AdminDTO>> {
    const foundAdmins = await this._rr.find({
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
