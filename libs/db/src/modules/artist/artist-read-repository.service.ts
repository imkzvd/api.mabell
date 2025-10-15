import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { App, Shared } from '@api.mabell/core';
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

    return foundDoc ? ArtistMapper.toDTO(foundDoc) : null;
  }

  async findByGenres(
    genres: string[],
    options?: Partial<{ isPublic: boolean; pagination: Shared.DTOs.OffsetLimitPaginationDTO }>,
  ) {
    const filter = {
      genres: { $in: genres },
      ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
    };
    const docsTotal = await this._artistModel.countDocuments(filter);
    const foundDocs = await this._artistModel
      .find(filter)
      .skip(options?.pagination?.offset || 0)
      .limit(options?.pagination?.limit || 50);

    return new App.DTOs.ArtistsDTO(
      foundDocs.map((doc) => ArtistMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.offset,
      options?.pagination?.limit,
    );
  }

  async getPublicStatusById(artistId: string) {
    const foundDoc = await this._artistModel.findById(artistId, 'isPublic').lean().exec();

    if (!foundDoc) {
      throw new NotFoundException('Artist not found');
    }

    return foundDoc.isPublic;
  }
}
