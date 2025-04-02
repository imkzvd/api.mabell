import { Command } from '@nestjs/cqrs';

export class UpdateArtistCoverByIdCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: {
      fileId: string;
      secondaryColor?: string | null;
    },
  ) {
    super();
  }
}
