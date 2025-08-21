import { SimplifiedArtistDTO } from './simplified-artist.dto';
import { AlbumId } from '../../domain/components/album';
import { LabelValueDTO } from '../../shared/dtos';
import { getAlbumTypeLabelByValue } from '../../domain/components/album';
import { getGenreLabelByValue } from '../../domain/common';

export class AlbumDTO {
  public readonly typeLabelValue: LabelValueDTO;
  public readonly genreLabelValues: LabelValueDTO[];

  constructor(
    public readonly id: AlbumId,
    public readonly name: string,
    public readonly artists: SimplifiedArtistDTO[],
    public readonly type: string,
    public readonly genres: string[],
    public readonly cover: string | null,
    public readonly color: string | null,
    public readonly description: string,
    public readonly releaseAt: Date | null,
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.typeLabelValue = new LabelValueDTO(getAlbumTypeLabelByValue(this.type), this.type);
    this.genreLabelValues = this.genres.map((i) => new LabelValueDTO(getGenreLabelByValue(i), i));
  }
}
