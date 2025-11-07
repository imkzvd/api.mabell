import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { App, Domain, Shared } from '@api.mabell/core';
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

  async findByIds(artistIds: string[], options?: Partial<{ isPublic: boolean }>) {
    const foundDocs = await this._artistModel
      .aggregate<ArtistDocument>([
        {
          $match: {
            _id: {
              $in: artistIds.map((i) => new Types.ObjectId(i)),
            },
            ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
          },
        },
      ])
      .exec();

    const foundDocsMap: Map<string, ArtistDocument> = new Map(
      foundDocs.map((doc) => [doc._id.toHexString(), doc]),
    );
    const itemsResult: (App.DTOs.ArtistDTO | null)[] = artistIds.map((id) => {
      const doc = foundDocsMap.get(id);

      return doc ? ArtistMapper.toDTO(doc) : null;
    });

    return {
      items: itemsResult,
      foundItems: itemsResult.filter((i) => i !== null),
      foundIds: [...foundDocsMap.keys()] as Domain.Artist.ArtistId[],
      total: foundDocsMap.size,
      missingIds: artistIds.filter((id) => !foundDocsMap.has(id)),
    };
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
