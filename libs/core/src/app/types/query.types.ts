export declare const QUERY_RESPONSE_TYPE_SYMBOL: unique symbol;

export class Query<TResponse> {
  readonly [QUERY_RESPONSE_TYPE_SYMBOL]: TResponse;
}
