import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { App, Domain, Shared } from '@api.mabell/core';
import AlbumMapper from './album.mapper';
import { AlbumDocument, AlbumWithArtists, AlbumWithArtistsDocument } from './types';
import { POPULATE_OPTIONS } from './constants';
import { Album } from './album.schema';

@Injectable()
export class AlbumReadRepository implements App.Ports.AlbumReadRepository {
  constructor(
    @InjectModel(Album.name)
    private readonly _albumModel: Model<AlbumDocument>,
  ) {}

  async findById(albumId: string, options?: { isPublic: boolean }) {
    const foundDoc = await this._albumModel
      .findOne(
        {
          _id: albumId,
          ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
        },
        null,
      )
      .populate<AlbumWithArtistsDocument>(POPULATE_OPTIONS)
      .lean<AlbumWithArtists>()
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
    const filter = {
      artists: artistId,
      ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
    };
    const docsTotal = await this._albumModel.countDocuments(filter);
    const foundDocs = await this._albumModel
      .find(filter, null)
      .limit(options?.pagination?.limit ?? 50)
      .sort({ createdAt: -1 })
      .skip(options?.pagination?.offset ?? 0)
      .populate<AlbumWithArtistsDocument[]>(POPULATE_OPTIONS)
      .lean<AlbumWithArtists[]>()
      .exec();

    return new App.DTOs.AlbumsDTO(
      foundDocs.map((doc) => AlbumMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.limit ?? 50,
      options?.pagination?.offset ?? 0,
      (options?.pagination?.limit ?? 50) + (options?.pagination?.offset ?? 0) < docsTotal,
    );
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
