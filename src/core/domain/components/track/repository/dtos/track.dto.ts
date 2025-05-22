export class TrackDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly album: string,
    public readonly trackNumber: number,
    public readonly artists: string[],
    public readonly featArtists: string[],
    public readonly file: string | null,
    public readonly duration: number | null,
    public readonly isExplicit: boolean,
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
