export class IndexedUserDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string | null,
    public readonly avatar: string | null,
  ) {}
}
