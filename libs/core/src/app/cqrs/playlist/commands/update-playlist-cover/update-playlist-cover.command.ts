import { Command } from '../../../../types';
import { UpdatePlaylistCoverPayload } from '../../../../components/playlist/types';

export class UpdatePlaylistCoverCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdatePlaylistCoverPayload,
  ) {
    super();
  }
}
