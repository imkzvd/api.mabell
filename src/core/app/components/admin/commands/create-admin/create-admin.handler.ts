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

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand> {
  constructor(
    @Inject(ADMIN_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _adminWriteRepository: AdminWriteRepository,
    @Inject(PASSWORD_SERVICE_DI_TOKEN)
    private readonly _passwordService: PasswordService,
  ) {}

  async execute({ username, name }: CreateAdminCommand) {
    const generatedId = this._adminWriteRepository.generateId();
    const generatedPassword = this._passwordService.generate(8);
    const hashedPassword = await this._passwordService.hash(generatedPassword);
    const nextAdminIndex = (await this._adminWriteRepository.getTotalCount()) + 1;
    const createdAdmin = AdminFactory.create({
      id: generatedId,
      username: username || `admin${nextAdminIndex}`,
      password: hashedPassword,
      name: name || `Admin #${nextAdminIndex}`,
    });

    await this._adminWriteRepository.save(createdAdmin);

    return {
      id: createdAdmin.getId(),
      password: generatedPassword,
    };
  }
}
