import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain } from '@api.mabell/core';
import { AdminRefreshTokenDocument } from './types';
import { AdminRefreshToken } from './admin-refresh-token.schema';
import RefreshTokenMapper from './admin-refresh-token.mapper';

@Injectable()
export class AdminRefreshTokenWriteRepository
  implements Domain.AdminRefreshToken.AdminRefreshTokenWriteRepository
{
  constructor(
    @InjectModel(AdminRefreshToken.name) private readonly _model: Model<AdminRefreshTokenDocument>,
  ) {}

  async save(entity: Domain.AdminRefreshToken.AdminRefreshToken) {
    const mappedDoc = RefreshTokenMapper.toPersistenceEntity(entity);

    await this._model.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(tokenId: string) {
    const result = await this._model.deleteOne({ _id: tokenId }).exec();

    return result.deletedCount ? (tokenId as Domain.AdminRefreshToken.AdminRefreshTokenId) : null;
  }

  async deleteByOwnerId(ownerId: string) {
    const queryFilter = { owner: ownerId };
    const foundDocs = await this._model.find(queryFilter, '_id').lean().exec();

    await this._model.deleteMany(queryFilter).exec();

    return {
      deletedIds: foundDocs.map(
        (doc) => doc._id.toHexString() as Domain.AdminRefreshToken.AdminRefreshTokenId,
      ),
      total: foundDocs.length,
    };
  }
}
