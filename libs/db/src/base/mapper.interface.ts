import { BaseDocument } from './base-document.abstract';

export interface WriteMapper<Document extends BaseDocument, Entity extends Record<string, any>> {
  toPersistenceEntity(entity: Entity): Document;
  toDomainEntity(doc: Document): Entity;
}

export interface ReadMapper<Document extends BaseDocument, DTO extends Record<string, any>> {
  toDTO(doc: Document): DTO;
}
