import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain } from '@api.mabell/core';
import UserRefreshTokenMapper from './user-refresh-token.mapper';
import { UserRefreshToken } from './user-refresh-token.schema';
import { UserRefreshTokenDocument } from './types';

@Injectable()
export class UserRefreshTokenWriteRepository
  implements Domain.UserRefreshToken.UserRefreshTokenWriteRepository
{
  constructor(
    @InjectModel(UserRefreshToken.name) private readonly _model: Model<UserRefreshTokenDocument>,
  ) {}

  async save(entity: Domain.UserRefreshToken.UserRefreshToken) {
    const mappedDoc = UserRefreshTokenMapper.toPersistenceEntity(entity);

    await this._model.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(tokenId: string) {
    const result = await this._model.deleteOne({ _id: tokenId }).exec();

    return result.deletedCount ? (tokenId as Domain.UserRefreshToken.UserRefreshTokenId) : null;
  }

  async deleteByOwnerId(ownerId: string) {
    const queryFilter = { owner: ownerId };
    const foundDocs = await this._model.find(queryFilter, '_id').lean().exec();

    await this._model.deleteMany(queryFilter).exec();

    return {
      deletedIds: foundDocs.map(
        (doc) => doc._id.toHexString() as Domain.UserRefreshToken.UserRefreshTokenId,
      ),
      total: foundDocs.length,
    };
  }
}
