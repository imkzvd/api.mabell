import { Query } from '../../../../types';
import { PlaylistDTO } from '../../../../dtos';

export class GetPlaylistQuery extends Query<PlaylistDTO | null> {
  constructor(
    public readonly id: string,
    public readonly options?: Partial<{
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
