import { Command } from '../../../../types';
import { UpdateArtistPayload } from '../../../../components/artist/types';

export class UpdateArtistCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistPayload,
  ) {
    super();
  }
}
