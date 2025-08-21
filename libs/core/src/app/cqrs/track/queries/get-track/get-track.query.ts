import { Query } from '../../../../types';
import { TrackWithAlbumDTO } from '../../../../dtos';

export class GetTrackQuery extends Query<TrackWithAlbumDTO | null> {
  constructor(
    public readonly id: string,
    public readonly options?: Partial<{
      isPublic: boolean;
    }>,
  ) {
    super();
  }
}
