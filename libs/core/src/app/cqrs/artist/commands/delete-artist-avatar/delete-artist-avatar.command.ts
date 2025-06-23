import { Command } from '@nestjs/cqrs';
import { ArtistId } from '../../../../../domain/components/artist/types';

export class DeleteArtistAvatarCommand extends Command<ArtistId> {
  constructor(public readonly id: string) {
    super();
  }
}
