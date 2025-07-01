import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { AdminRefreshTokenReadRepository as AdminRefreshTokenReadRepositoryPort } from '@core/domain/components/admin-refresh-token/repository/admin-refresh-token-read-repository.port';
import { AdminRefreshTokenDTO } from '@core/domain/components/admin-refresh-token/repository/dtos/admin-refresh-token.dto';
import { AdminRefreshTokenDocument } from './types';
import { AdminRefreshToken } from './admin-refresh-token.schema';
import AdminRefreshTokenMapper from './admin-refresh-token.mapper';

@Injectable()
export class AdminRefreshTokenReadRepository implements AdminRefreshTokenReadRepositoryPort {
  constructor(
    @InjectModel(AdminRefreshToken.name) private readonly _model: Model<AdminRefreshTokenDocument>,
  ) {}

  async findById(id: string): Promise<AdminRefreshTokenDTO | null> {
    const foundDoc = await this._model.findById(id, null).lean<AdminRefreshToken>().exec();

    if (!foundDoc) {
      return null;
    }

    return AdminRefreshTokenMapper.toDTO(foundDoc);
  }

  async findByOwnerId(ownerId: string): Promise<AdminRefreshTokenDTO[]> {
    const filter = { owner: ownerId };
    const foundDocs = await this._model.find(filter).lean<AdminRefreshToken[]>().exec();

    return foundDocs.map((doc) => AdminRefreshTokenMapper.toDTO(doc));
  }
}
