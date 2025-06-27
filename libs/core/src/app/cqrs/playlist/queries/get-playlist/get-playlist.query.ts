import { Query } from '@core/app/types';
import { PlaylistDTO } from '@core/app/components/playlist/dtos/playlist.dto';

export class GetPlaylistQuery extends Query<PlaylistDTO | null> {
  constructor(
    public readonly id: string,
    public readonly isPublic?: boolean,
  ) {
    super();
  }
}
