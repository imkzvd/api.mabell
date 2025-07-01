export declare const COMMAND_RESPONSE_TYPE_SYMBOL: unique symbol;

export class Command<TResponse> {
  readonly [COMMAND_RESPONSE_TYPE_SYMBOL]: TResponse;
}
