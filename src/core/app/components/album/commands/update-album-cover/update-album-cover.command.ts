import { Command } from '@nestjs/cqrs';

export class UpdateAlbumCoverCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: {
      fileId: string;
      color?: string | null;
    },
  ) {
    super();
  }
}
