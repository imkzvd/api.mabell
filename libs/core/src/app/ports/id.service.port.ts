export interface IdService<T = string> {
  generate: () => T;
}
