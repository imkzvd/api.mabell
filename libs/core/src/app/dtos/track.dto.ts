import { SimplifiedArtistDTO } from './simplified-artist.dto';
import { TrackId } from '../../domain/components/track';

export class TrackDTO {
  constructor(
    public readonly id: TrackId,
    public readonly name: string,
    public readonly album: string,
    public readonly artists: SimplifiedArtistDTO[],
    public readonly featArtists: SimplifiedArtistDTO[],
    public readonly file: string | null,
    public readonly duration: number | null,
    public readonly trackNumber: number,
    public readonly isExplicit: boolean,
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
