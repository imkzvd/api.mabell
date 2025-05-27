import { Command } from '@nestjs/cqrs';
import { UpdateArtistPayload } from '../../types';
import { ArtistId } from '../../../../../domain/components/artist/types';

export class UpdateArtistCommand extends Command<ArtistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistPayload,
  ) {
    super();
  }
}
