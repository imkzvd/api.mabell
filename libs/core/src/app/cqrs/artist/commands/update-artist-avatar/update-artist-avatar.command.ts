import { Command } from '../../../../types';
import { UpdateArtistAvatarPayload } from '../../../../components/artist/types';

export class UpdateArtistAvatarCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistAvatarPayload,
  ) {
    super();
  }
}
