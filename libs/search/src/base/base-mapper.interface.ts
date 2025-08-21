export interface BaseMapper<
  Doc extends Record<string, any>,
  DTO extends Record<string, any>,
  Payload extends Record<string, any>,
> {
  toDocument(payload: Payload): Doc;

  toDTO(doc: Doc): DTO;
}
