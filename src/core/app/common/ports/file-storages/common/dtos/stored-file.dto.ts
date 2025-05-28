export class StoredFileDTO {
  constructor(
    public readonly name: string,
    public readonly path: string,
    public readonly fullPath: string,
    public readonly size: number,
    public readonly type: string,
  ) {}
}
