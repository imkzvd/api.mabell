export class OffsetLimitPaginationDTO {
  constructor(
    public readonly limit: number,
    public readonly offset: number,
  ) {}
}
