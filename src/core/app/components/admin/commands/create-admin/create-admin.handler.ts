import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateAdminCommand } from './create-admin.command';
import {
  ADMIN_WRITE_REPOSITORY_DI_TOKEN,
  AdminWriteRepository,
} from '../../../../../domain/components/admin/repository/admin-write-repository.port';
import {
  PASSWORD_SERVICE_DI_TOKEN,
  PasswordService,
} from '../../../../common/services/password-service.port';
import { AdminFactory } from '../../../../../domain/components/admin/admin.factory';
import { ID_SERVICE_DI_TOKEN, IdService } from '../../../../common/services/id-service.port';
import { AdminId } from '../../../../../domain/components/admin/admin.entity';
import { ADMIN_PASSWORD_LENGTH } from '../../constants';

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand> {
  constructor(
    @Inject(ADMIN_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _adminWriteRepository: AdminWriteRepository,
    @Inject(ID_SERVICE_DI_TOKEN)
    private readonly _idService: IdService<AdminId>,
    @Inject(PASSWORD_SERVICE_DI_TOKEN)
    private readonly _passwordService: PasswordService,
  ) {}

  async execute() {
    const generatedId = this._idService.generate();
    const { password, hashPassword } = await this._passwordService.generate({
      length: ADMIN_PASSWORD_LENGTH,
      hash: true,
    });

    const nextAdminIndex = await this._adminWriteRepository.getNextIndex();
    const createdAdmin = AdminFactory.create({
      id: generatedId,
      username: `guest${nextAdminIndex}`,
      password: hashPassword,
      name: `Guest #${nextAdminIndex}`,
    });

    await this._adminWriteRepository.save(createdAdmin);

    return {
      id: createdAdmin.getId(),
      password,
    };
  }
}
