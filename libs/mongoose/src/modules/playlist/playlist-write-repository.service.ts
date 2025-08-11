import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Playlist as DomainPlaylist,
  PlaylistWriteRepository as PlaylistWriteRepositoryPort,
  PlaylistId,
} from '@api.mabell/core';
import { Playlist } from './playlist.schema';
import PlaylistMapper from './playlist.mapper';
import { PlaylistDocument } from './types';

@Injectable()
export class PlaylistWriteRepository implements PlaylistWriteRepositoryPort {
  constructor(
    @InjectModel(Playlist.name)
    private readonly _playlistModel: Model<PlaylistDocument>,
  ) {}

  async save(entity: DomainPlaylist): Promise<void> {
    const mappedDoc = PlaylistMapper.toPersistenceEntity(entity);

    return this._playlistModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<PlaylistId | null> {
    const result = await this._playlistModel.deleteOne({ _id: id }).exec();

    return result.deletedCount ? (id as PlaylistId) : null;
  }

  async deleteByUserId(userId: string): Promise<{ deletedIds: PlaylistId[]; total: number }> {
    const queryFilter = { user: userId };
    const foundDocs = await this._playlistModel.find(queryFilter, '_id').lean().exec();

    await this._playlistModel.deleteMany(queryFilter).exec();

    return {
      deletedIds: foundDocs.map((doc) => doc._id.toHexString() as PlaylistId),
      total: foundDocs.length,
    };
  }

  async findById(id: string): Promise<DomainPlaylist | null> {
    const foundDoc = await this._playlistModel.findOne({ _id: id }).lean<Playlist>().exec();

    return foundDoc ? PlaylistMapper.toDomainEntity(foundDoc) : null;
  }

  async getNextPlaylistIndexByUserId(userId: string): Promise<number> {
    const docsTotal = await this._playlistModel.countDocuments({ user: userId });

    return docsTotal + 1;
  }
}
