import { Command } from '@nestjs/cqrs';

export class UpdateTrackFeatArtistsCommand extends Command<void> {
  constructor(
    public readonly trackId: string,
    public readonly artists: string[],
  ) {
    super();
  }
}
