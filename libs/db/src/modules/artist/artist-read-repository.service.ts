import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { App } from '@api.mabell/core';
import ArtistMapper from './artist.mapper';
import { Artist } from './artist.schema';
import { ArtistDocument } from './types';

@Injectable()
export class ArtistReadRepository implements App.Ports.ArtistReadRepository {
  constructor(
    @InjectModel(Artist.name)
    private readonly _artistModel: Model<ArtistDocument>,
  ) {}

  async findById(artistId: string, options?: Partial<{ isPublic: boolean }>) {
    const foundDoc = await this._artistModel
      .findOne(
        {
          _id: artistId,
          ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
        },
        null,
      )
      .lean<Artist>()
      .exec();

    if (!foundDoc) {
      return null;
    }

    return ArtistMapper.toDTO(foundDoc);
  }

  async getPublicStatusById(artistId: string) {
    const foundDoc = await this._artistModel.findById(artistId, 'isPublic').lean().exec();

    if (!foundDoc) {
      throw new NotFoundException('Artist not found');
    }

    return foundDoc.isPublic;
  }
}
