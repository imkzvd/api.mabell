import { Command } from '@nestjs/cqrs';
import { Region } from '../../../../../domain/common/constants/regions';

export class RegisterUserCommand extends Command<{ id: string }> {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly name: string,
    public readonly email: string,
    public readonly birthDate: Date,
    public readonly region: Region,
  ) {
    super();
  }
}
