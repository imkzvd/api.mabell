export class Artist {
  constructor(
    public id: string,
    public name: string,
    public avatar: string | undefined,
    public isGlobal: boolean = false,
  ) {}
}
