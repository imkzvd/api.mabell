import { Command } from '@nestjs/cqrs';
import { UpdateArtistCoverPayload } from '../../types';

export class UpdateArtistCoverCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistCoverPayload,
  ) {
    super();
  }
}
