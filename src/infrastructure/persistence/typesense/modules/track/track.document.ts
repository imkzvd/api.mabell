export class TrackDocument {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly album: { id: string; name: string; type: string; releaseAt?: Date },
    public readonly albumName: string,
    public readonly artists: { id: string; name: string }[],
    public readonly featArtists: { id: string; name: string }[],
    public readonly allArtistNames: string[],
    public readonly isPublic: boolean,
    public readonly isExplicit: boolean,
    public readonly file?: string,
    public readonly duration?: number,
    public readonly cover?: string,
  ) {}
}
