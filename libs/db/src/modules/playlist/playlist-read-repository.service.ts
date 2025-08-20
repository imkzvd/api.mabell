import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { App, Shared } from '@api.mabell/core';
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

    if (!foundDoc) {
      return null;
    }

    return PlaylistMapper.toDTO(foundDoc);
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
      .limit(options?.pagination?.limit ?? 50)
      .sort({ createdAt: -1 })
      .skip(options?.pagination?.offset ?? 0)
      .populate<PlaylistWithUserDocument[]>(POPULATE_OPTIONS)
      .lean<PlaylistWithUser[]>()
      .exec();

    return new App.DTOs.PlaylistsDTO(
      foundDocs.map((doc) => PlaylistMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.limit ?? 50,
      options?.pagination?.offset ?? 0,
      (options?.pagination?.limit ?? 50) + (options?.pagination?.offset ?? 0) < docsTotal,
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
      options?.pagination?.limit ?? 50,
      options?.pagination?.offset ?? 0,
      (options?.pagination?.limit ?? 50) + (options?.pagination?.offset ?? 0) <
        foundDoc.tracks.length,
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
