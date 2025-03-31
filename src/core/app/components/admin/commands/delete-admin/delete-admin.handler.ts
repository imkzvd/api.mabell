import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { DeleteAdminCommand } from './delete-admin.command';
import {
  ADMIN_WRITE_REPOSITORY_DI_TOKEN,
  AdminWriteRepository,
} from '../../../../../domain/components/admin/repository/admin-write-repository.port';
import { AdminRoles } from '../../../../../domain/components/admin/constants/admin-roles';
import { BadRequestException } from '../../../../../shared/exceptions';

@CommandHandler(DeleteAdminCommand)
export class DeleteAdminHandler implements ICommandHandler<DeleteAdminCommand> {
  constructor(
    @Inject(ADMIN_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _adminWriteRepository: AdminWriteRepository,
  ) {}

  async execute({ id }: DeleteAdminCommand) {
    const foundAdmin = await this._adminWriteRepository.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    if (foundAdmin.getRole().value === AdminRoles.Owner) {
      throw new BadRequestException("You can't delete the owner.");
    }

    const deletedAdminId = await this._adminWriteRepository.deleteById(id);

    if (!deletedAdminId) {
      throw new NotFoundException('Admin does not exist');
    }
  }
}
