import { Command } from '../../../../types';
import { UserId } from '../../../../../domain/components/user/types';

export class CreateUserCommand extends Command<{ id: UserId }> {
  constructor() {
    super();
  }
}
