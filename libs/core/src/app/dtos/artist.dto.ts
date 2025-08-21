import { ArtistId } from '../../domain/components/artist';
import { LabelValueDTO } from '../../shared/dtos';
import { getGenreLabelByValue } from '../../domain/common';

export class ArtistDTO {
  public readonly genreLabelValues: LabelValueDTO[];

  constructor(
    public readonly id: ArtistId,
    public readonly name: string,
    public readonly birthName: string | null,
    public readonly birthDate: Date | null,
    public readonly genres: string[],
    public readonly biography: string,
    public readonly avatar: string | null,
    public readonly cover: string | null,
    public readonly accentColor: string | null,
    public readonly secondaryColor: string | null,
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.genreLabelValues = this.genres.map((i) => new LabelValueDTO(getGenreLabelByValue(i), i));
  }
}
