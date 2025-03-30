export class OffsetLimitPaginationResponseDTO<Item> {
  constructor(
    public readonly items: Item[],
    public readonly total: number,
    public readonly limit: number,
    public readonly offset: number,
    public readonly hasMore: boolean,
  ) {}
}
