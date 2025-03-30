import { Model, type PopulateOptions } from 'mongoose';
import { BaseDocument } from './base-document.abstract';
import { ReadMapper } from './mapper.interface';
import { ReadRepository } from '../../../../core/app/common/base/read-repository/read-repository.interface';
import { OffsetLimitPaginationDTO } from '../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { QueryFilter } from '../../../../core/domain/common/repository/query-filter.abstract';

export abstract class BaseReadRepository<
  Doc extends BaseDocument,
  DTO extends Record<string, any>,
  SimplifiedDTO extends Record<string, any>,
  Filter extends QueryFilter,
> implements ReadRepository<DTO, SimplifiedDTO, Filter>
{
  constructor(
    protected readonly _model: Model<Doc>,
    protected readonly _mapper: ReadMapper<Doc, DTO, SimplifiedDTO>,
    protected readonly _populationOptions?: PopulateOptions[],
  ) {}

  async findById(id: string): Promise<DTO | null> {
    const queryFilter = { _id: id };

    const foundDoc = await this._model
      .findOne(queryFilter)
      .populate(this._populationOptions || [])
      .lean<Doc>();

    return foundDoc ? this._mapper.toDTO(foundDoc) : null;
  }

  async findByIds(ids: string[]): Promise<{
    items: DTO[];
    foundIds: string[];
    missingIds: string[];
  }> {
    const findFilter = { _id: ids };

    const foundDocs = await this._model
      .find(findFilter)
      .populate(this._populationOptions || [])
      .lean<Doc[]>();

    const docsMap: Map<string, Doc> = new Map(foundDocs.map((doc) => [doc._id.toHexString(), doc]));
    const sortedDocs = ids.map((id) => docsMap.get(id)!);
    const foundDocIds = sortedDocs.map((doc) => doc._id.toHexString());
    const missingDocIds = ids.filter((id) => !foundDocIds.includes(id));

    return {
      items: sortedDocs.map((doc) => this._mapper.toDTO(doc)),
      foundIds: foundDocIds,
      missingIds: missingDocIds,
    };
  }

  async find(
    options?: Partial<{
      filter: Filter;
      pagination: OffsetLimitPaginationDTO;
      projection: Partial<Record<keyof SimplifiedDTO, 0 | 1>>;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<SimplifiedDTO>> {
    const docsTotal = await this._model.countDocuments();
    const foundDocs = await this._model
      .find()
      .populate(this._populationOptions || [])
      .limit(options?.pagination?.limit || 50)
      .skip(options?.pagination?.offset || 0)
      .sort({
        createdAt: -1,
      })
      .lean<Doc[]>();

    return new OffsetLimitPaginationResponseDTO(
      foundDocs.map((doc) => this._mapper.toSimplifiedDTO(doc)),
      docsTotal,
      options?.pagination?.limit || 50,
      options?.pagination?.offset || 0,
      (options?.pagination?.limit || 50) + (options?.pagination?.offset || 0) < docsTotal,
    );
  }
}
