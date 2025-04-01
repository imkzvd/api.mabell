import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../../../domain/components/user/repository/user-write-repository.port';
import {
  PASSWORD_SERVICE_DI_TOKEN,
  PasswordService,
} from '../../../../common/services/password-service.port';
import { UserFactory } from '../../../../../domain/components/user/user.factory';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
    @Inject(PASSWORD_SERVICE_DI_TOKEN)
    private readonly _passwordService: PasswordService,
  ) {}

  async execute({ username, name }: CreateUserCommand) {
    const generatedId = this._userWriteRepository.generateId();
    const generatedPassword = this._passwordService.generate(8);
    const hashedPassword = await this._passwordService.hash(generatedPassword);
    const nextUserIndex = (await this._userWriteRepository.getTotalCount()) + 1;
    const createdAdmin = UserFactory.create({
      id: generatedId,
      username: username || `user${nextUserIndex}`,
      password: hashedPassword,
      name: name || `Alex Smith`,
    });

    await this._userWriteRepository.save(createdAdmin);

    return {
      id: createdAdmin.getId(),
      password: generatedPassword,
    };
  }
}
