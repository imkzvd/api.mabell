import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AdminRefreshTokenWriteRepository as AdminRefreshTokenWriteRepositoryPort,
  AdminRefreshToken as DomainAdminRefreshToken,
  AdminRefreshTokenId,
} from '@api.mabell/core';
import { AdminRefreshTokenDocument } from './types';
import { AdminRefreshToken } from './admin-refresh-token.schema';
import RefreshTokenMapper from './admin-refresh-token.mapper';

@Injectable()
export class AdminRefreshTokenWriteRepository implements AdminRefreshTokenWriteRepositoryPort {
  constructor(
    @InjectModel(AdminRefreshToken.name) private readonly _model: Model<AdminRefreshTokenDocument>,
  ) {}

  async save(entity: DomainAdminRefreshToken): Promise<void> {
    const mappedDoc = RefreshTokenMapper.toPersistenceEntity(entity);

    return this._model.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<AdminRefreshTokenId | null> {
    const result = await this._model.deleteOne({ _id: id }).exec();

    return result.deletedCount ? (id as AdminRefreshTokenId) : null;
  }

  async deleteByOwnerId(
    ownerId: string,
  ): Promise<{ deletedIds: AdminRefreshTokenId[]; total: number }> {
    const queryFilter = { owner: ownerId };
    const foundDocs = await this._model.find(queryFilter, '_id').lean().exec();

    await this._model.deleteMany(queryFilter).exec();

    return {
      deletedIds: foundDocs.map((doc) => doc._id.toHexString() as AdminRefreshTokenId),
      total: foundDocs.length,
    };
  }
}
