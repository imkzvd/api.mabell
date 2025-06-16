import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken as DomainRefreshToken } from '../../../../../core/domain/components/refresh-token/refresh-token.entity';
import { RefreshTokenDocument } from './types';
import { RefreshTokenWriteRepository } from '../../../../../core/domain/components/refresh-token/repository/refresh-token-write-repository.port';
import { RefreshToken } from './refresh-token.schema';
import RefreshTokenMapper from './refresh-token.mapper';
import { RefreshTokenId } from '../../../../../core/domain/components/refresh-token/types';

@Injectable()
export class RefreshTokenWriteRepositoryAdapter implements RefreshTokenWriteRepository {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly _refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  async save(entity: DomainRefreshToken): Promise<void> {
    const mappedDoc = RefreshTokenMapper.toPersistenceEntity(entity);

    return this._refreshTokenModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<RefreshTokenId | null> {
    const result = await this._refreshTokenModel.deleteOne({ _id: id }).exec();

    return result.deletedCount ? (id as RefreshTokenId) : null;
  }

  async deleteByOwnerId(ownerId: string): Promise<{ deletedIds: RefreshTokenId[]; total: number }> {
    const queryFilter = { owner: ownerId };
    const foundDocs = await this._refreshTokenModel.find(queryFilter, '_id').lean().exec();

    await this._refreshTokenModel.deleteMany(queryFilter).exec();

    return {
      deletedIds: foundDocs.map((doc) => doc._id.toHexString() as RefreshTokenId),
      total: foundDocs.length,
    };
  }
}
