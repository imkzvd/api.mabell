import { BaseDocument } from './base-document.abstract';

export interface WriteMapper<Document extends BaseDocument, Entity extends Record<string, any>> {
  toDocument(entity: Entity): Document;
  toEntity(doc: Document): Entity;
}

export interface ReadMapper<
  Document extends BaseDocument,
  DTO extends Record<string, any>,
  PopulatedDocument extends BaseDocument = Document,
  PopulatedDTO extends Record<string, any> = DTO,
> {
  toDTO(doc: Document): DTO;
  toPopulatedDTO(doc: PopulatedDocument): PopulatedDTO;
}
