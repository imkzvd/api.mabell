import { SimplifiedUserDTO } from './simplified-user.dto';
import { PlaylistId } from '../../domain/components/playlist';
import { LabelValueDTO } from '../../shared/dtos';
import { getGenreLabelByValue } from '../../domain/common';
import { TrackId } from '../../domain/components/track';

export class PlaylistDTO {
  public readonly genreLabelValues: LabelValueDTO[];

  constructor(
    public readonly id: PlaylistId,
    public readonly user: SimplifiedUserDTO,
    public readonly name: string,
    public readonly genres: string[],
    public readonly cover: string | null,
    public readonly color: string | null,
    public readonly description: string,
    public readonly tracks: { id: TrackId; addedAt: Date }[],
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.genreLabelValues = this.genres.map((i) => new LabelValueDTO(getGenreLabelByValue(i), i));
  }
}
