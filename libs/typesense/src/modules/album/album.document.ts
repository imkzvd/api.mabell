export class Album {
  constructor(
    public id: string,
    public name: string,
    public artistIds: string[],
    public artistNames: string[],
    public cover?: string,
    public isGlobal: boolean = false,
  ) {}
}
