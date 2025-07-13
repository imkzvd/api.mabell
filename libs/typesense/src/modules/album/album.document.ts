export class Album {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artistIds: string[],
    public readonly artistNames: string[],
    public readonly cover?: string,
    public readonly isGlobal: boolean = false,
  ) {}
}
