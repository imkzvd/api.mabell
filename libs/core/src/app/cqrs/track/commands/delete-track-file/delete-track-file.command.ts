import { Command } from '../../../../types';

export class DeleteTrackFileCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
