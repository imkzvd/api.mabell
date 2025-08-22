import { Command } from '../../../../types';

export class DeleteArtistCoverCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
