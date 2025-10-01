export class Album {
  constructor(
    public id: string,
    public name: string,
    public artistIds: string[],
    public artistNames: string[],
    public artistPublic: boolean[],
    public cover?: string,
    public isPublic: boolean = false,
    public isGlobal: boolean = false,
  ) {}
}
