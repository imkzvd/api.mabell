import { Query } from '@nestjs/cqrs';
import { PlaylistDTO } from '../../dtos/playlist.dto';

export class GetPlaylistQuery extends Query<PlaylistDTO | null> {
  constructor(
    public readonly id: string,
    public readonly isPublic?: boolean,
  ) {
    super();
  }
}
