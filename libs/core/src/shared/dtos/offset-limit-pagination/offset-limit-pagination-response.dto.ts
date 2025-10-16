export class OffsetLimitPaginationResponseDTO<Item extends Record<string, any> | string> {
  public readonly hasMore: boolean;

  constructor(
    public readonly items: Item[] = [],
    public readonly total: number = 0,
    public readonly offset: number = 0,
    public readonly limit: number = 50,
  ) {
    this.hasMore = this.total > this.limit + this.offset;
  }
}
