import { Command } from '../../../../types';

export class UpdateUserEmailCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly email: string,
  ) {
    super();
  }
}
