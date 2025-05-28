import { Command } from '@nestjs/cqrs';
import { UpdatePlaylistPayload } from '../../types';
import { PlaylistId } from '../../../../../domain/components/playlist/types';

export class UpdatePlaylistCommand extends Command<PlaylistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdatePlaylistPayload,
  ) {
    super();
  }
}
