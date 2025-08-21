import { UserId } from '../../domain/components/user';
import { LabelValueDTO } from '../../shared/dtos';
import { getGenreLabelByValue, getRegionLabelByValue } from '../../domain/common';

export class UserDTO {
  public readonly regionLabelValue: LabelValueDTO;
  public readonly genreLabelValues: LabelValueDTO[];

  constructor(
    public readonly id: UserId,
    public readonly username: string,
    public readonly password: string,
    public readonly name: string,
    public readonly email: string | null,
    public readonly birthDate: Date | null,
    public readonly region: string,
    public readonly genres: string[],
    public readonly avatar: string | null,
    public readonly color: string | null,
    public readonly isBlocked: boolean,
    public readonly isVerified: boolean,
    public readonly isPublic: boolean,
    public readonly isPremium: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.regionLabelValue = new LabelValueDTO(getRegionLabelByValue(this.region), this.region);
    this.genreLabelValues = this.genres.map((i) => new LabelValueDTO(getGenreLabelByValue(i), i));
  }
}
