import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RefreshUserPasswordCommand } from './refresh-user-password.command';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../../../domain/components/user/repository/user-write-repository.port';
import {
  PASSWORD_SERVICE_DI_TOKEN,
  PasswordService,
} from '../../../../common/services/password-service.port';
import { NotFoundException } from '../../../../../shared/exceptions';

@CommandHandler(RefreshUserPasswordCommand)
export class RefreshUserPasswordHandler implements ICommandHandler<RefreshUserPasswordCommand> {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
    @Inject(PASSWORD_SERVICE_DI_TOKEN)
    private readonly _passwordService: PasswordService,
  ) {}

  async execute({ id }: RefreshUserPasswordCommand) {
    const foundUser = await this._userWriteRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundException(`There is no user with the specified ID`);
    }

    const generatedPassword = this._passwordService.generate(8);
    const hashedPassword = await this._passwordService.hash(generatedPassword);

    foundUser.updatePassword(hashedPassword);

    await this._userWriteRepository.save(foundUser);

    return {
      password: generatedPassword,
    };
  }
}
