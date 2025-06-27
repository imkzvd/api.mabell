export declare const RESPONSE_TYPE_SYMBOL: unique symbol;

export class Query<TResponse> {
  readonly [RESPONSE_TYPE_SYMBOL]: TResponse;
}
