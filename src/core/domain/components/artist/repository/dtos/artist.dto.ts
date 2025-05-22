import { Genre } from '../../../../common/constants/genres';

export class ArtistDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly birthName: string | null,
    public readonly birthDate: Date | null,
    public readonly genres: Genre[],
    public readonly biography: string,
    public readonly avatar: string | null,
    public readonly cover: string | null,
    public readonly accentColor: string | null,
    public readonly secondaryColor: string | null,
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
