import { Command } from '@nestjs/cqrs';

export class UpdateArtistCoverCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: Partial<{
      fileId: string | null;
      color: string | null;
    }>,
  ) {
    super();
  }
}
