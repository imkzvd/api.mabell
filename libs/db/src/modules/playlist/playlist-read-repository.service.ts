import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { App, Domain, Shared } from '@api.mabell/core';
import { Playlist } from './playlist.schema';
import { PlaylistWithUser, PlaylistWithUserDocument } from './types';
import PlaylistMapper from './playlist.mapper';
import { POPULATE_OPTIONS } from './constants';

@Injectable()
export class PlaylistReadRepository implements App.Ports.PlaylistReadRepository {
  constructor(
    @InjectModel(Playlist.name)
    private readonly _playlistModel: Model<Playlist>,
  ) {}

  async findById(playlistId: string, options?: Partial<{ isPublic: boolean }>) {
    const foundDoc = await this._playlistModel
      .findOne(
        {
          _id: playlistId,
          ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
        },
        null,
      )
      .populate<PlaylistWithUserDocument>(POPULATE_OPTIONS)
      .lean<PlaylistWithUser>()
      .exec();

    return foundDoc ? PlaylistMapper.toDTO(foundDoc) : null;
  }

  async findByIds(playlistIds: string[], options?: Partial<{ isPublic: boolean }>) {
    const foundDocs = await this._playlistModel
      .aggregate<PlaylistWithUser>([
        {
          $match: {
            _id: {
              $in: playlistIds.map((i) => new Types.ObjectId(i)),
            },
            ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: { path: '$user' } },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'user.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
      ])
      .exec();

    const foundDocsMap: Map<string, PlaylistWithUser> = new Map(
      foundDocs.map((doc) => [doc._id.toHexString(), doc]),
    );
    const itemsResult: (App.DTOs.PlaylistDTO | null)[] = playlistIds.map((id) => {
      const doc = foundDocsMap.get(id);

      return doc ? PlaylistMapper.toDTO(doc) : null;
    });

    return {
      items: itemsResult,
      foundItems: itemsResult.filter((i) => i !== null),
      foundIds: [...foundDocsMap.keys()] as Domain.Playlist.PlaylistId[],
      total: foundDocsMap.size,
      missingIds: playlistIds.filter((id) => !foundDocsMap.has(id)),
    };
  }

  async findByUserId(
    userId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: Shared.DTOs.OffsetLimitPaginationDTO;
    }>,
  ) {
    const filter = {
      user: userId,
      ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
    };
    const docsTotal = await this._playlistModel.countDocuments(filter);
    const foundDocs = await this._playlistModel
      .find(filter, null)
      .skip(options?.pagination?.offset ?? 0)
      .limit(options?.pagination?.limit ?? 50)
      .sort({ createdAt: -1 })
      .populate<PlaylistWithUserDocument[]>(POPULATE_OPTIONS)
      .lean<PlaylistWithUser[]>()
      .exec();

    return new App.DTOs.PlaylistsDTO(
      foundDocs.map((doc) => PlaylistMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.offset,
      options?.pagination?.limit,
    );
  }

  async findByGenres(
    genres: string[],
    options?: Partial<{
      isPublic: boolean;
      pagination: Shared.DTOs.OffsetLimitPaginationDTO;
    }>,
  ) {
    const filter = {
      genres: { $in: genres },
      ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
    };
    const docsTotal = await this._playlistModel.countDocuments(filter);
    const foundDocs = await this._playlistModel
      .find(filter, null)
      .limit(options?.pagination?.limit ?? 50)
      .sort({ createdAt: -1 })
      .skip(options?.pagination?.offset ?? 0)
      .populate<PlaylistWithUserDocument[]>(POPULATE_OPTIONS)
      .lean<PlaylistWithUser[]>()
      .exec();

    return new App.DTOs.PlaylistsDTO(
      foundDocs.map((doc) => PlaylistMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.offset,
      options?.pagination?.limit,
    );
  }

  async getTrackIdsById(
    playlistId: string,
    options?: Partial<{
      pagination?: Shared.DTOs.OffsetLimitPaginationDTO;
    }>,
  ) {
    const foundDoc = await this._playlistModel
      .findById(playlistId, 'tracks')
      .lean<Pick<Playlist, 'tracks'>>()
      .exec();

    if (!foundDoc) {
      throw new NotFoundException('Playlist not found');
    }

    return new App.DTOs.PlaylistTrackIdsDTO(
      foundDoc.tracks,
      foundDoc.tracks.length,
      options?.pagination?.limit,
      options?.pagination?.offset,
    );
  }

  async getPublicStatusById(playlistId: string) {
    const foundDoc = await this._playlistModel.findById(playlistId, 'isPublic').lean().exec();

    if (!foundDoc) {
      throw new NotFoundException('Playlist not found');
    }

    return foundDoc.isPublic;
  }
}
