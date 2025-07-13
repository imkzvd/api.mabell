export class Track {
  constructor(
    public id: string,
    public name: string,
    public albumId: string,
    public albumName: string,
    public artistIds: string[],
    public artistNames: string[],
    public featArtistIds: string[],
    public featArtistNames: string[],
    public isExplicit: boolean,
    public cover?: string,
    public isGlobal: boolean = false,
  ) {}
}
