import { Command } from '@nestjs/cqrs';

export class UpdateArtistAvatarByIdCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: {
      fileId: string;
      accentColor?: string | null;
    },
  ) {
    super();
  }
}
