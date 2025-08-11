import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import {
  UserRefreshTokenReadRepository as UserRefreshTokenReadRepositoryPort,
  UserRefreshTokenDTO,
} from '@api.mabell/core';
import UserRefreshTokenMapper from './user-refresh-token.mapper';
import { UserRefreshToken } from './user-refresh-token.schema';
import { UserRefreshTokenDocument } from './types';

@Injectable()
export class UserRefreshTokenReadRepository implements UserRefreshTokenReadRepositoryPort {
  constructor(
    @InjectModel(UserRefreshToken.name) private readonly _model: Model<UserRefreshTokenDocument>,
  ) {}

  async findById(id: string): Promise<UserRefreshTokenDTO | null> {
    const foundDoc = await this._model.findById(id, null).lean<UserRefreshToken>().exec();

    if (!foundDoc) {
      return null;
    }

    return UserRefreshTokenMapper.toDTO(foundDoc);
  }

  async findByOwnerId(ownerId: string): Promise<UserRefreshTokenDTO[]> {
    const filter = { owner: ownerId };
    const foundDocs = await this._model.find(filter).lean<UserRefreshToken[]>().exec();

    return foundDocs.map((doc) => UserRefreshTokenMapper.toDTO(doc));
  }
}
