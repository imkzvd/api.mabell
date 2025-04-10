import { AlbumType } from '../../../../domain/components/album/constants/album-types';
import { ArtistDTO } from '../../artist/dtos/artist.dto';
import { Genre } from '../../../../domain/common/constants/genres';

export class SimplifiedAlbumDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artistIds: string[],
    public readonly artists: ArtistDTO[],
    public readonly type: AlbumType,
    public readonly genres: Genre[],
    public readonly cover: string | null,
    public readonly color: string | null,
    public readonly description: string,
    public readonly releaseAt: Date | null,
    public readonly tracksIds: string[],
    public readonly tracks: Record<string, any>[],
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
