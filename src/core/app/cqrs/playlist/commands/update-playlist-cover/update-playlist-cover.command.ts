import { Command } from '@nestjs/cqrs';
import { PlaylistId } from '../../../../../domain/components/playlist/types';
import { UpdatePlaylistCoverPayload } from '../../../../components/playlist/types';

export class UpdatePlaylistCoverCommand extends Command<PlaylistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdatePlaylistCoverPayload,
  ) {
    super();
  }
}
