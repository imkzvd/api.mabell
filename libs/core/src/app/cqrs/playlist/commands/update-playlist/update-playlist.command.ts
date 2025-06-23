import { Command } from '@nestjs/cqrs';
import { PlaylistId } from '../../../../../domain/components/playlist/types';
import { UpdatePlaylistPayload } from '../../../../components/playlist/types';

export class UpdatePlaylistCommand extends Command<PlaylistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdatePlaylistPayload,
  ) {
    super();
  }
}
