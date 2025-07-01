export class OffsetLimitPaginationResponseDTO<Item extends Record<string, any> | string> {
  constructor(
    public readonly items: Item[],
    public readonly total: number,
    public readonly limit: number,
    public readonly offset: number,
    public readonly hasMore: boolean,
  ) {}
}
