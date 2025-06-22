import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ArtistMapper from './artist.mapper';
import { Artist } from './artist.schema';
import { ArtistDocument } from './types';
import { NotFoundException } from '../../../../../src/core/shared/exceptions';
import { ArtistReadRepository as ArtistReadRepositoryPort } from '../../../../../src/core/domain/components/artist/repository/artist-read-repository.port';
import { ArtistDTO } from '../../../../../src/core/domain/components/artist/repository/dtos/artist.dto';

@Injectable()
export class ArtistReadRepository implements ArtistReadRepositoryPort {
  constructor(
    @InjectModel(Artist.name)
    private readonly _artistModel: Model<ArtistDocument>,
  ) {}

  async findById(id: string, options?: Partial<{ isPublic: boolean }>): Promise<ArtistDTO | null> {
    const foundDoc = await this._artistModel
      .findOne(
        {
          _id: id,
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

  async getPublicStatus(id: string): Promise<boolean> {
    const foundDoc = await this._artistModel.findById(id, 'isPublic').lean().exec();

    if (!foundDoc) {
      throw new NotFoundException('Artist not found');
    }

    return foundDoc.isPublic;
  }
}
