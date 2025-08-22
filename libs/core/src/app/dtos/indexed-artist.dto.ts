export class IndexedArtistDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly avatar: string | null,
  ) {}
}
