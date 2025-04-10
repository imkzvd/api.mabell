import { Command } from '@nestjs/cqrs';

export class CreateAlbumCommand extends Command<{ id: string }> {
  constructor(
    public readonly artistId: string,
    public readonly name?: string,
  ) {
    super();
  }
}
