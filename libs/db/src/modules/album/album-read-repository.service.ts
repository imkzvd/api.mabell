import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { App, Domain, Shared } from '@api.mabell/core';
import AlbumMapper from './album.mapper';
import { AlbumDocument, AlbumWithArtistsDocument } from './types';
import { Album } from './album.schema';

@Injectable()
export class AlbumReadRepository implements App.Ports.AlbumReadRepository {
  constructor(
    @InjectModel(Album.name)
    private readonly _albumModel: Model<AlbumDocument>,
  ) {}

  async findById(albumId: string, options?: { isPublic: boolean }) {
    const [foundDoc] = await this._albumModel
      .aggregate<AlbumWithArtistsDocument>([
        {
          $match: {
            _id: new Types.ObjectId(albumId),
            ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
          },
        },
        {
          $lookup: {
            from: 'artists',
            localField: 'artists',
            foreignField: '_id',
            as: 'artists',
          },
        },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'artists.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
      ])
      .exec();

    if (!foundDoc) {
      return null;
    }

    return AlbumMapper.toDTO(foundDoc);
  }

  async findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: Shared.DTOs.OffsetLimitPaginationDTO;
    }>,
  ) {
    const [result] = await this._albumModel
      .aggregate<{ docs: AlbumWithArtistsDocument[]; docsTotal: number }>([
        {
          $match: {
            artists: new Types.ObjectId(artistId),
            ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
          },
        },
        {
          $lookup: {
            from: 'artists',
            localField: 'artists',
            foreignField: '_id',
            as: 'artists',
          },
        },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'artists.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
        {
          $facet: {
            docsTotal: [{ $count: 'count' }],
            docs: [
              { $sort: { createdAt: -1 } },
              { $skip: options?.pagination?.offset ?? 0 },
              { $limit: options?.pagination?.limit ?? 50 },
            ],
          },
        },
        {
          $project: {
            docsTotal: { $arrayElemAt: ['$docsTotal.count', 0] },
            docs: 1,
          },
        },
      ])
      .exec();

    return new App.DTOs.AlbumsDTO(
      result.docs.map((doc) => AlbumMapper.toDTO(doc)),
      result.docsTotal,
      options?.pagination?.offset ?? 0,
      options?.pagination?.limit ?? 50,
      (options?.pagination?.limit ?? 50) + (options?.pagination?.offset ?? 0) < result.docsTotal,
    );
  }

  async findLatestAlbumByArtistId(artistId: string, options?: Partial<AlbumWithArtistsDocument>) {
    const [foundDoc] = await this._albumModel
      .aggregate<AlbumWithArtistsDocument>([
        {
          $match: {
            artists: new Types.ObjectId(artistId),
            ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
          },
        },
        {
          $lookup: {
            from: 'artists',
            localField: 'artists',
            foreignField: '_id',
            as: 'artists',
          },
        },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'artists.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
        {
          $sort: {
            releaseAt: -1,
          },
        },
      ])
      .exec();

    return foundDoc ? AlbumMapper.toDTO(foundDoc) : null;
  }

  async getPublicStatusById(albumId: string) {
    const foundDoc = await this._albumModel
      .findById(albumId, 'isPublic')
      .lean<{ isPublic: boolean }>()
      .exec();

    if (!foundDoc) {
      throw new NotFoundException('Artist not found');
    }

    return foundDoc.isPublic;
  }

  async getArtistIdsById(albumId: string) {
    const foundDoc = await this._albumModel
      .findById(albumId, 'artists')
      .lean<Pick<Album, 'artists'>>()
      .exec();

    if (!foundDoc) {
      throw new NotFoundException('Artist not found');
    }

    return foundDoc.artists.map((i) => i.toHexString() as Domain.Artist.ArtistId);
  }
}
