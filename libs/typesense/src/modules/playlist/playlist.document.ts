export class Playlist {
  constructor(
    public id: string,
    public name: string,
    public ownerId: string,
    public ownerName: string,
    public cover: string | undefined,
    public isGlobal: boolean = false,
  ) {}
}
