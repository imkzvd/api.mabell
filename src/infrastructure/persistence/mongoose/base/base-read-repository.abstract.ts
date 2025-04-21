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
  Filter extends QueryFilter = QueryFilter,
  PopulatedDoc extends BaseDocument = Doc,
  PopulatedDTO extends Record<string, any> = DTO,
> implements ReadRepository<DTO, Filter, PopulatedDTO>
{
  constructor(
    protected readonly _model: Model<Doc>,
    protected readonly _mapper: ReadMapper<Doc, DTO, PopulatedDoc, PopulatedDTO>,
    protected readonly _populationOptions: PopulateOptions[] = [],
  ) {}

  findById(id: string, withPopulate?: false): Promise<DTO | null>;
  findById(id: string, withPopulate?: true): Promise<PopulatedDTO | null>;
  async findById(id: string, withPopulate: boolean = false): Promise<DTO | PopulatedDTO | null> {
    const query = this._model.findById(id, null, { lean: true });

    if (withPopulate) {
      query.populate(this._populationOptions);
    }

    const foundDoc = await query.exec();

    if (!foundDoc) {
      return null;
    }

    return withPopulate
      ? this._mapper.toPopulatedDTO(foundDoc as PopulatedDoc)
      : this._mapper.toDTO(foundDoc as Doc);
  }

  findByIds(
    ids: string[],
    withPopulate?: false,
  ): Promise<{
    items: DTO[];
    foundIds: string[];
    missingIds: string[];
  }>;
  findByIds(
    ids: string[],
    withPopulate?: true,
  ): Promise<{
    items: PopulatedDTO[];
    foundIds: string[];
    missingIds: string[];
  }>;
  async findByIds(
    ids: string[],
    withPopulate: boolean = false,
  ): Promise<{
    items: (DTO | PopulatedDTO)[];
    foundIds: string[];
    missingIds: string[];
  }> {
    const query = this._model.find({ _id: ids }, null, { lean: true });

    if (withPopulate) {
      query.populate(this._populationOptions);
    }

    const foundDocs = await query.exec();

    const docsMap: Map<string, Doc | PopulatedDoc> = new Map(
      foundDocs.map((doc) => [doc._id.toHexString(), doc as Doc | PopulatedDoc]),
    );
    const sortedDocs = ids.map((id) => docsMap.get(id)!);
    const foundDocIds = sortedDocs.map((doc) => doc._id.toHexString());
    const missingDocIds = ids.filter((id) => !foundDocIds.includes(id));

    return {
      items: sortedDocs.map((doc) =>
        withPopulate
          ? this._mapper.toPopulatedDTO(doc as PopulatedDoc)
          : this._mapper.toDTO(doc as Doc),
      ),
      foundIds: foundDocIds,
      missingIds: missingDocIds,
    };
  }

  async find(
    options?: Partial<{
      filter: Filter;
      withPopulate: false;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<DTO>>;
  async find(
    options?: Partial<{
      filter: Filter;
      withPopulate: true;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<PopulatedDTO>>;
  async find(
    options?: Partial<{
      filter: Filter;
      withPopulate: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<DTO | PopulatedDTO>> {
    const docsTotal = await this._model.countDocuments();

    const query = this._model.find({}, null, {
      lean: true,
      limit: options?.pagination?.limit ?? 50,
      skip: options?.pagination?.offset ?? 0,
      sort: {
        createdAt: -1,
      },
    });

    if (options?.withPopulate) {
      query.populate(this._populationOptions);
    }

    const foundDocs = await query.exec();

    return new OffsetLimitPaginationResponseDTO(
      foundDocs.map((doc) =>
        options?.withPopulate
          ? this._mapper.toPopulatedDTO(doc as PopulatedDoc)
          : this._mapper.toDTO(doc as Doc),
      ),
      docsTotal,
      options?.pagination?.limit || 50,
      options?.pagination?.offset || 0,
      (options?.pagination?.limit || 50) + (options?.pagination?.offset || 0) < docsTotal,
    );
  }
}
