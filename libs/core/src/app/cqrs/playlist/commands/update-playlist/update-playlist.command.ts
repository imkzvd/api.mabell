import { Command } from '../../../../types';
import { UpdatePlaylistPayload } from '../../../../components/playlist/types';

export class UpdatePlaylistCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdatePlaylistPayload,
  ) {
    super();
  }
}
