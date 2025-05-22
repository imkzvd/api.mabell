import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { Admin } from './admin.schema';
import AdminMapper from './admin.mapper';
import { AdminDocument } from './types';
import { AdminReadRepository } from '../../../../../core/domain/components/admin/repository/admin-read-repository.port';
import { AdminDTO } from '../../../../../core/domain/components/admin/repository/dtos/admin.dto';
import { OffsetLimitPaginationDTO } from '../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

@Injectable()
export class AdminReadRepositoryAdapter implements AdminReadRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly _adminModel: Model<AdminDocument>,
  ) {}

  async findById(id: string): Promise<AdminDTO | null> {
    const foundDoc = await this._adminModel.findById(id, null).lean<Admin>().exec();

    if (!foundDoc) {
      return null;
    }

    return AdminMapper.toDTO(foundDoc);
  }

  async find(
    options?: Partial<{
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<AdminDTO>> {
    const docsTotal = await this._adminModel.countDocuments();

    const foundDocs = await this._adminModel
      .find({}, null, {
        limit: options?.pagination?.limit ?? 50,
        skip: options?.pagination?.offset ?? 0,
        sort: { createdAt: -1 },
      })
      .lean<Admin[]>()
      .exec();

    return new OffsetLimitPaginationResponseDTO(
      foundDocs.map((doc) => AdminMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.limit || 50,
      options?.pagination?.offset || 0,
      (options?.pagination?.limit || 50) + (options?.pagination?.offset || 0) < docsTotal,
    );
  }
}
