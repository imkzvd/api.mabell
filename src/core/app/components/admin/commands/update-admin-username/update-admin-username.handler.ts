import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAdminUsernameCommand } from './update-admin-username.command';
import {
  ADMIN_WRITE_REPOSITORY_DI_TOKEN,
  AdminWriteRepository,
} from '../../../../../domain/components/admin/repository/admin-write-repository.port';
import { DuplicationException, NotFoundException } from '../../../../../shared/exceptions';
import { AdminFilter } from '../../../../../domain/components/admin/repository/admin.filter';

@CommandHandler(UpdateAdminUsernameCommand)
export class UpdateAdminUsernameHandler implements ICommandHandler<UpdateAdminUsernameCommand> {
  constructor(
    @Inject(ADMIN_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _adminWriteRepository: AdminWriteRepository,
  ) {}

  async execute({ id, username }: UpdateAdminUsernameCommand) {
    const foundAdmin = await this._adminWriteRepository.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException(`There is no admin with the specified ID`);
    }

    const existingAdminId = await this._adminWriteRepository.existsByFilter(
      new AdminFilter({ username }),
    );

    if (existingAdminId) {
      throw new DuplicationException(`The admin with this username already exist`);
    }

    foundAdmin.updateUsername(username);

    return this._adminWriteRepository.save(foundAdmin);
  }
}
