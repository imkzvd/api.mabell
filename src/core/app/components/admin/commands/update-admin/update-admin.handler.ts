import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAdminCommand } from './update-admin.command';
import {
  ADMIN_WRITE_REPOSITORY_DI_TOKEN,
  AdminWriteRepository,
} from '../../../../../domain/components/admin/repository/admin-write-repository.port';
import { NotFoundException } from '../../../../../shared/exceptions';

@CommandHandler(UpdateAdminCommand)
export class UpdateAdminHandler implements ICommandHandler<UpdateAdminCommand> {
  constructor(
    @Inject(ADMIN_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _adminWriteRepository: AdminWriteRepository,
  ) {}

  async execute({ id, payload }: UpdateAdminCommand) {
    const foundAdmin = await this._adminWriteRepository.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException(`There is no admin with the specified ID`);
    }

    foundAdmin.updateName(payload.name || foundAdmin.getName().value);
    foundAdmin.updateRole(payload.role || foundAdmin.getRole().value);
    foundAdmin.updateBlockedStatus(payload.isBlocked ?? foundAdmin.getBlockedStatus());

    return this._adminWriteRepository.save(foundAdmin);
  }
}
