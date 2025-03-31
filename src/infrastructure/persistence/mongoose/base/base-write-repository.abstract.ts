import { Model, type PopulateOptions, Types } from 'mongoose';
import { BaseDocument } from './base-document.abstract';
import { WriteMapper } from './mapper.interface';
import { EntityId } from '../../../../core/domain/common/types/entity-id.type';
import { QueryFilter } from '../../../../core/domain/common/repository/query-filter.abstract';
import { WriteRepository } from '../../../../core/domain/common/repository/write-repository.interface';

export abstract class BaseWriteRepository<
  Doc extends BaseDocument,
  Entity extends Record<string, any>,
  ID extends EntityId<string>,
  Filter extends QueryFilter,
> implements WriteRepository<Entity, ID, Filter>
{
  constructor(
    protected readonly _model: Model<Doc>,
    protected readonly _mapper: WriteMapper<Doc, Entity>,
    protected readonly _populationOptions?: PopulateOptions[],
  ) {}

  generateId(): ID {
    return new Types.ObjectId().toHexString() as ID;
  }

  async save(entity: Entity | Entity[]): Promise<void> {
    if (Array.isArray(entity)) {
      const mappedDocs = entity.map((e) => this._mapper.toDocument(e));

      await this._model.bulkWrite(
        mappedDocs.map((doc) => ({
          updateOne: {
            filter: { _id: doc._id },
            update: { $set: doc },
            upsert: true,
          },
        })),
      );
    } else {
      const mappedDoc = this._mapper.toDocument(entity);
      const queryFilter = { _id: mappedDoc._id };

      await this._model.findByIdAndUpdate(queryFilter, mappedDoc, {
        new: true,
        upsert: true,
        runValidators: true,
      });
    }
  }

  async findById(id: string): Promise<Entity | null> {
    const queryFilter = { _id: id };

    const foundDoc = await this._model
      .findOne(queryFilter)
      .populate(this._populationOptions || [])
      .lean<Doc>();

    return foundDoc ? this._mapper.toEntity(foundDoc) : null;
  }

  async findByIds(ids: string[]): Promise<{
    items: Entity[];
    foundIds: ID[];
    missingIds: string[];
  }> {
    const findFilter = { _id: ids };

    const foundDocs = await this._model
      .find(findFilter)
      .populate(this._populationOptions || [])
      .lean<Doc[]>();
    const docsMap: Map<string, Doc> = new Map(foundDocs.map((doc) => [doc._id.toString(), doc]));
    const sortedDocs = ids.map((id) => docsMap.get(id)!);
    const foundDocIds = sortedDocs.map((doc) => doc._id.toHexString());
    const missingDocIds = ids.filter((id) => !foundDocIds.includes(id));

    return {
      items: sortedDocs.map((doc) => this._mapper.toEntity(doc)),
      foundIds: foundDocIds as ID[],
      missingIds: missingDocIds,
    };
  }

  async deleteById(id: string): Promise<ID | null> {
    const result = await this._model.deleteOne({ _id: id }).lean();

    return result.deletedCount ? (id as ID) : null;
  }

  async deleteByIds(ids: string[]): Promise<{
    deletedIds: ID[];
    missingIds: string[];
  }> {
    const queryFilter = { _id: ids };
    const foundDocs = await this._model.find(queryFilter).select('_id').lean();
    const foundDocIds = foundDocs.map((i) => i._id.toHexString());
    const missingDocIds = ids.filter((id) => !foundDocIds.includes(id));

    await this._model.deleteMany({ _id: foundDocIds });

    return {
      deletedIds: foundDocIds as ID[],
      missingIds: missingDocIds,
    };
  }

  async existsById(id: string): Promise<ID | null> {
    const queryFilter = { _id: id };
    const foundDoc = await this._model.exists(queryFilter);

    return foundDoc ? (foundDoc._id.toHexString() as ID) : null;
  }

  async existsByIds(ids: string[]): Promise<{
    foundIds: ID[];
    missingIds: string[];
  }> {
    const findFilter = { _id: ids };

    const foundDocs = await this._model.find(findFilter).select('_id').lean();
    const foundDocIds = foundDocs.map((i) => i._id.toHexString());

    return {
      foundIds: foundDocs.map((doc) => doc._id.toHexString() as ID),
      missingIds: ids.filter((id) => !foundDocIds.includes(id)),
    };
  }

  async existsByFilter(filter: Filter): Promise<ID | null> {
    const foundDoc = await this._model.findOne(filter.toQuery()).select('_id').lean();

    return foundDoc ? (foundDoc._id.toHexString() as ID) : null;
  }

  async getTotalCount(): Promise<number> {
    return this._model.countDocuments();
  }
}
