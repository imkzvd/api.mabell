export class ArtistDocument {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly isPublic: boolean,
    public readonly birthName?: string,
    public readonly avatar?: string,
  ) {}
}
