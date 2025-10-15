import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { App } from '@api.mabell/core';
import UserRefreshTokenMapper from './user-refresh-token.mapper';
import { UserRefreshToken } from './user-refresh-token.schema';
import { UserRefreshTokenDocument } from './types';

@Injectable()
export class UserRefreshTokenReadRepository implements App.Ports.UserRefreshTokenReadRepository {
  constructor(
    @InjectModel(UserRefreshToken.name) private readonly _model: Model<UserRefreshTokenDocument>,
  ) {}

  async findById(tokenId: string) {
    const foundDoc = await this._model.findById(tokenId, null).lean<UserRefreshToken>().exec();

    return foundDoc ? UserRefreshTokenMapper.toDTO(foundDoc) : null;
  }

  async findByOwnerId(ownerId: string) {
    const filter = { owner: ownerId };
    const foundDocs = await this._model.find(filter).lean<UserRefreshToken[]>().exec();

    return foundDocs.map((doc) => UserRefreshTokenMapper.toDTO(doc));
  }
}
