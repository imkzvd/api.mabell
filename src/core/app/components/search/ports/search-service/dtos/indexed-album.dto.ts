export class IndexedAlbumDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artists: { id: string; name: string }[],
    public readonly cover: string | null,
    public readonly releaseAt: Date | null,
    public readonly isPublic: boolean,
  ) {}
}
