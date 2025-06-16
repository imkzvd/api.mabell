import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { RefreshTokenDocument } from './types';
import { RefreshTokenReadRepository } from '../../../../../core/domain/components/refresh-token/repository/refresh-token-read-repository.port';
import { RefreshToken } from './refresh-token.schema';
import { RefreshTokenDTO } from '../../../../../core/domain/components/refresh-token/repository/dtos/refresh-token.dto';
import RefreshTokenMapper from './refresh-token.mapper';

@Injectable()
export class RefreshTokenReadRepositoryAdapter implements RefreshTokenReadRepository {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly _refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  async findById(id: string): Promise<RefreshTokenDTO | null> {
    const foundDoc = await this._refreshTokenModel.findById(id, null).lean<RefreshToken>().exec();

    if (!foundDoc) {
      return null;
    }

    return RefreshTokenMapper.toDTO(foundDoc);
  }

  async findByOwnerId(ownerId: string): Promise<RefreshTokenDTO[]> {
    const filter = { owner: ownerId };
    const foundDocs = await this._refreshTokenModel.find(filter).lean<RefreshToken[]>().exec();

    return foundDocs.map((doc) => RefreshTokenMapper.toDTO(doc));
  }
}
