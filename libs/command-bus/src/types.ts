import { App } from '@api.mabell/core';

export type ExtractCommandResponse<TCommand extends App.Types.Command<any>> =
  TCommand extends App.Types.Command<infer R> ? R : never;
