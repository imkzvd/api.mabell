export class Artist {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly avatar: string | undefined,
    public readonly isGlobal: boolean = false,
  ) {}
}
