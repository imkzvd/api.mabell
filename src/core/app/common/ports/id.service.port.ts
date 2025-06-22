export const ID_SERVICE_DI_TOKEN = Symbol('ID_SERVICE_DI_TOKEN');

export interface IdService<T = string> {
  generate: () => T;
}
