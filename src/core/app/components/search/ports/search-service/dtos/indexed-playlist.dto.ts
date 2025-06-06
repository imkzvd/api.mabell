export class IndexedPlaylistDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly cover: string | null,
    public readonly isPublic: boolean,
  ) {}
}
