import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserPasswordCommand } from './update-user-password.command';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../../../domain/components/user/repository/user-write-repository.port';
import {
  PASSWORD_SERVICE_DI_TOKEN,
  PasswordService,
} from '../../../../common/services/password-service.port';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '../../../../../shared/exceptions';
import { USER_MIN_LENGTH_PASSWORD } from '../../constants';

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler implements ICommandHandler<UpdateUserPasswordCommand> {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
    @Inject(PASSWORD_SERVICE_DI_TOKEN)
    private readonly _passwordService: PasswordService,
  ) {}

  async execute({ id, payload }: UpdateUserPasswordCommand) {
    const foundUser = await this._userWriteRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundException(`There is no user with the specified ID`);
    }

    const isValidPassword = await this._passwordService.validate(
      payload.password,
      foundUser.getPassword(),
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('The password is incorrect');
    }

    if (payload.newPassword.length < USER_MIN_LENGTH_PASSWORD) {
      throw new BadRequestException('Password is invalid');
    }

    const hashedNewPassword = await this._passwordService.hash(payload.newPassword);

    foundUser.updatePassword(hashedNewPassword);

    return this._userWriteRepository.save(foundUser);
  }
}
