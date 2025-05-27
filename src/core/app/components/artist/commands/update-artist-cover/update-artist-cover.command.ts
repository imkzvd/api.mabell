import { Command } from '@nestjs/cqrs';
import { UpdateArtistCoverPayload } from '../../types';
import { ArtistId } from '../../../../../domain/components/artist/types';

export class UpdateArtistCoverCommand extends Command<ArtistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistCoverPayload,
  ) {
    super();
  }
}
