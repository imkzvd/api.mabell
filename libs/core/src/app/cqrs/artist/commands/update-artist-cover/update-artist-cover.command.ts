import { Command } from '../../../../types';
import { UpdateArtistCoverPayload } from '../../../../components/artist/types';

export class UpdateArtistCoverCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistCoverPayload,
  ) {
    super();
  }
}
