export class AlbumDocument {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artists: { id: string; name: string }[],
    public readonly artistNames: string[],
    public readonly isPublic: boolean,
    public readonly cover?: string,
    public readonly releaseAt?: Date,
  ) {}
}
