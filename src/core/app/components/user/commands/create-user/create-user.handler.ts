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
import { ID_SERVICE_DI_TOKEN, IdService } from '../../../../common/services/id-service.port';
import { UserId } from '../../../../../domain/components/user/user.entity';
import { USER_MIN_LENGTH_PASSWORD } from '../../constants';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
    @Inject(ID_SERVICE_DI_TOKEN)
    private readonly _idService: IdService<UserId>,
    @Inject(PASSWORD_SERVICE_DI_TOKEN)
    private readonly _passwordService: PasswordService,
  ) {}

  async execute({ username, name }: CreateUserCommand) {
    const generatedId = this._idService.generate();
    const { password, hashPassword } = await this._passwordService.generate({
      length: USER_MIN_LENGTH_PASSWORD,
      hash: true,
    });
    const nextUserIndex = await this._userWriteRepository.getNextIndex();
    const createdAdmin = UserFactory.create({
      id: generatedId,
      username: username || `user${nextUserIndex}`,
      password: hashPassword,
      name: name || `User #${nextUserIndex}`,
    });

    await this._userWriteRepository.save(createdAdmin);

    return {
      id: createdAdmin.getId(),
      password,
    };
  }
}
