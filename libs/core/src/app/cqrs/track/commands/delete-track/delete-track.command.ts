import { Command } from '../../../../types';

export class DeleteTrackCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
