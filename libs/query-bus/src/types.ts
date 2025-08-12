import { App } from '@api.mabell/core';

export type ExtractQueryResponse<TQuery extends App.Types.Query<any>> =
  TQuery extends App.Types.Query<infer R> ? R : never;
