import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterUserCommand } from './register-user.command';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../../../domain/components/user/repository/user-write-repository.port';
import {
  PASSWORD_SERVICE_DI_TOKEN,
  PasswordService,
} from '../../../../common/services/password-service.port';
import { UserFactory } from '../../../../../domain/components/user/user.factory';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
    @Inject(PASSWORD_SERVICE_DI_TOKEN)
    private readonly _passwordService: PasswordService,
  ) {}

  async execute({ username, password, name, email, birthDate, region }: RegisterUserCommand) {
    const generatedId = this._userWriteRepository.generateId();
    const hashedPassword = await this._passwordService.hash(password);
    const createdAdmin = UserFactory.create({
      id: generatedId,
      username,
      password: hashedPassword,
      name,
      email,
      birthDate,
      region,
    });

    await this._userWriteRepository.save(createdAdmin);

    return {
      id: createdAdmin.getId(),
    };
  }
}
