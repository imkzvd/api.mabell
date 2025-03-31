import { QueryFilter } from './query-filter.abstract';
import { EntityId } from '../types/entity-id.type';

export interface WriteRepository<Entity, ID extends EntityId<string>, Filter extends QueryFilter> {
  generateId(): ID;
  save(entity: Entity | Entity[]): Promise<void>;
  findById(id: string): Promise<Entity | null>;
  findByIds(ids: string[]): Promise<{
    items: Entity[];
    foundIds: ID[];
    missingIds: string[];
  }>;
  deleteById(id: string): Promise<ID | null>;
  deleteByIds(ids: string[]): Promise<{
    deletedIds: ID[];
    missingIds: string[];
  }>;
  existsById(id: string): Promise<ID | null>;
  existsByIds(ids: string[]): Promise<{
    foundIds: ID[];
    missingIds: string[];
  }>;
  existsByFilter(filter: Filter): Promise<ID | null>;
  getTotalCount(): Promise<number>;
}
