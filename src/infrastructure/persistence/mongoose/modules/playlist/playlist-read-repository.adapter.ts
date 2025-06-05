import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist } from './playlist.schema';
import { PlaylistWithOwner, PlaylistWithOwnerDocument } from './types';
import PlaylistMapper from './playlist.mapper';
import { POPULATE_OPTIONS } from './constants';
import { NotFoundException } from '../../../../../core/shared/exceptions';
import { PlaylistReadRepository } from '../../../../../core/domain/components/playlist/repository/playlist-read-repository.port';
import { PlaylistWithOwnerDTO } from '../../../../../core/domain/components/playlist/repository/dtos/playlist-with-owner.dto';
import { OffsetLimitPaginationDTO } from '../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

@Injectable()
export class PlaylistReadRepositoryAdapter implements PlaylistReadRepository {
  constructor(
    @InjectModel(Playlist.name)
    private readonly _playlistModel: Model<Playlist>,
  ) {}

  async findById(
    id: string,
    options?: Partial<{ isPublic: boolean }>,
  ): Promise<PlaylistWithOwnerDTO | null> {
    const foundDoc = await this._playlistModel
      .findOne(
        {
          _id: id,
          ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
        },
        null,
      )
      .populate<PlaylistWithOwnerDocument>(POPULATE_OPTIONS)
      .lean<PlaylistWithOwner>()
      .exec();

    if (!foundDoc) {
      return null;
    }

    return PlaylistMapper.toDTO(foundDoc);
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
