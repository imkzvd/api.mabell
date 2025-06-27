export declare const COMMAND_RESPONSE_TYPE_SYMBOL: unique symbol;

export declare class Command<TResponse> {
  readonly [COMMAND_RESPONSE_TYPE_SYMBOL]: TResponse;
}
