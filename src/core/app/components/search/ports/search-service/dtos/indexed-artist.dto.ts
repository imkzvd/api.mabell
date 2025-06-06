export class IndexedArtistDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly birthName: string | null,
    public readonly avatar: string | null,
    public readonly isPublic: boolean,
  ) {}
}
