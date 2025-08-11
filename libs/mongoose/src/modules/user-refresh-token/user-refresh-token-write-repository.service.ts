import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserRefreshToken as DomainUserRefreshToken,
  UserRefreshTokenWriteRepository as UserRefreshTokenWriteRepositoryPort,
  UserRefreshTokenId,
} from '@api.mabell/core';
import UserRefreshTokenMapper from './user-refresh-token.mapper';
import { UserRefreshToken } from './user-refresh-token.schema';
import { UserRefreshTokenDocument } from './types';

@Injectable()
export class UserRefreshTokenWriteRepository implements UserRefreshTokenWriteRepositoryPort {
  constructor(
    @InjectModel(UserRefreshToken.name) private readonly _model: Model<UserRefreshTokenDocument>,
  ) {}

  async save(entity: DomainUserRefreshToken): Promise<void> {
    const mappedDoc = UserRefreshTokenMapper.toPersistenceEntity(entity);

    return this._model.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<UserRefreshTokenId | null> {
    const result = await this._model.deleteOne({ _id: id }).exec();

    return result.deletedCount ? (id as UserRefreshTokenId) : null;
  }

  async deleteByOwnerId(
    ownerId: string,
  ): Promise<{ deletedIds: UserRefreshTokenId[]; total: number }> {
    const queryFilter = { owner: ownerId };
    const foundDocs = await this._model.find(queryFilter, '_id').lean().exec();

    await this._model.deleteMany(queryFilter).exec();

    return {
      deletedIds: foundDocs.map((doc) => doc._id.toHexString() as UserRefreshTokenId),
      total: foundDocs.length,
    };
  }
}
