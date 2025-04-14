import { Command } from '@nestjs/cqrs';

export class CreateTrackCommand extends Command<{ id: string }> {
  constructor(
    public readonly albumId: string,
    public readonly name?: string,
  ) {
    super();
  }
}
