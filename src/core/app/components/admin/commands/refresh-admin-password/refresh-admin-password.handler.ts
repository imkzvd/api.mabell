import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { RefreshAdminPasswordCommand } from './refresh-admin-password.command';
import {
  ADMIN_WRITE_REPOSITORY_DI_TOKEN,
  AdminWriteRepository,
} from '../../../../../domain/components/admin/repository/admin-write-repository.port';
import {
  PASSWORD_SERVICE_DI_TOKEN,
  PasswordService,
} from '../../../../common/services/password-service.port';

@CommandHandler(RefreshAdminPasswordCommand)
export class RefreshAdminPasswordHandler implements ICommandHandler<RefreshAdminPasswordCommand> {
  constructor(
    @Inject(ADMIN_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _adminWriteRepository: AdminWriteRepository,
    @Inject(PASSWORD_SERVICE_DI_TOKEN)
    private readonly _passwordService: PasswordService,
  ) {}

  async execute({ id }: RefreshAdminPasswordCommand) {
    const foundAdmin = await this._adminWriteRepository.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException(`There is no admin with the specified ID`);
    }

    const generatedPassword = this._passwordService.generate(8);
    const hashedPassword = await this._passwordService.hash(generatedPassword);

    foundAdmin.updatePassword(hashedPassword);

    await this._adminWriteRepository.save(foundAdmin);

    return {
      password: generatedPassword,
    };
  }
}
