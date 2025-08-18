import { SimplifiedArtistDTO } from './simplified-artist.dto';
import { LabelValueDTO } from '../../shared/dtos';
import { AlbumId } from '../../domain/components/album/types';

export class AlbumDTO {
  constructor(
    public readonly id: AlbumId,
    public readonly name: string,
    public readonly artists: SimplifiedArtistDTO[],
    public readonly type: LabelValueDTO,
    public readonly genres: LabelValueDTO[],
    public readonly cover: string | null,
    public readonly color: string | null,
    public readonly description: string,
    public readonly releaseAt: Date | null,
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
