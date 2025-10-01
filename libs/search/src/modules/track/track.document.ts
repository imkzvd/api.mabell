export class Track {
  constructor(
    public id: string,
    public name: string,
    public albumId: string,
    public albumName: string,
    public albumPublic: boolean,
    public artistIds: string[],
    public artistNames: string[],
    public artistPublic: boolean[],
    public featArtistIds: string[],
    public featArtistNames: string[],
    public featArtistPublic: boolean[],
    public isExplicit: boolean,
    public cover?: string,
    public isPublic: boolean = false,
    public isGlobal: boolean = false,
  ) {}
}
