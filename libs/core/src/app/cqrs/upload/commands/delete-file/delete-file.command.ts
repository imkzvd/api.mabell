import { Command } from '../../../../types';

export class DeleteFileCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
