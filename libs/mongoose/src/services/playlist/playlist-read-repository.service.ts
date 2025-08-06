import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@core/shared/exceptions';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { PlaylistReadRepository as PlaylistReadRepositoryPort } from '@core/domain/components/playlist/repository/playlist-read-repository.port';
import { PlaylistWithUserDTO } from '@core/domain/components/playlist/repository/dtos/playlist-with-user.dto';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { Playlist } from './playlist.schema';
import { PlaylistWithUser, PlaylistWithUserDocument } from './types';
import PlaylistMapper from './playlist.mapper';
import { POPULATE_OPTIONS } from './constants';

@Injectable()
export class PlaylistReadRepository implements PlaylistReadRepositoryPort {
  constructor(
    @InjectModel(Playlist.name)
    private readonly _playlistModel: Model<Playlist>,
  ) {}

  async findById(
    id: string,
    options?: Partial<{ isPublic: boolean }>,
  ): Promise<PlaylistWithUserDTO | null> {
    const foundDoc = await this._playlistModel
      .findOne(
        {
          _id: id,
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
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<PlaylistWithUserDTO>> {
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

    return new OffsetLimitPaginationResponseDTO(
      foundDocs.map((doc) => PlaylistMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.limit ?? 50,
      options?.pagination?.offset ?? 0,
      (options?.pagination?.limit ?? 50) + (options?.pagination?.offset ?? 0) < docsTotal,
    );
  }

  async getTracks(
    id: string,
    options?: Partial<{
      pagination?: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<{ id: string; addedAt: Date }>> {
    const foundDoc = await this._playlistModel
      .findById(id, 'tracks')
      .lean<Pick<Playlist, 'tracks'>>()
      .exec();

    if (!foundDoc) {
      throw new NotFoundException('Playlist not found');
    }

    return new OffsetLimitPaginationResponseDTO(
      foundDoc.tracks,
      foundDoc.tracks.length,
      options?.pagination?.limit ?? 50,
      options?.pagination?.offset ?? 0,
      (options?.pagination?.limit ?? 50) + (options?.pagination?.offset ?? 0) <
        foundDoc.tracks.length,
    );
  }

  async getPublicStatus(id: string): Promise<boolean> {
    const foundDoc = await this._playlistModel.findById(id, 'isPublic').lean().exec();

    if (!foundDoc) {
      throw new NotFoundException('Playlist not found');
    }

    return foundDoc.isPublic;
  }
}
