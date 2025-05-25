import { Command } from '@nestjs/cqrs';
import { UpdateArtistPayload } from '../../types';

export class UpdateArtistCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistPayload,
  ) {
    super();
  }
}
