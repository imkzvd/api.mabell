export class Playlist {
  constructor(
    public id: string,
    public name: string,
    public userId: string,
    public userName: string,
    public cover: string | undefined,
    public isGlobal: boolean = false,
  ) {}
}
