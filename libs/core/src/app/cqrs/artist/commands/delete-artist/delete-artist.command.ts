import { Command } from '../../../../types';

export class DeleteArtistCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
