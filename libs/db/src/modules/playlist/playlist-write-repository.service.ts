import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain } from '@api.mabell/core';
import { Playlist } from './playlist.schema';
import PlaylistMapper from './playlist.mapper';
import { PlaylistDocument } from './types';

@Injectable()
export class PlaylistWriteRepository implements Domain.Playlist.PlaylistWriteRepository {
  constructor(
    @InjectModel(Playlist.name)
    private readonly _playlistModel: Model<PlaylistDocument>,
  ) {}

  async save(entity: Domain.Playlist.Playlist) {
    const mappedDoc = PlaylistMapper.toPersistenceEntity(entity);

    await this._playlistModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(playlistId: string) {
    const result = await this._playlistModel.deleteOne({ _id: playlistId }).exec();

    return result.deletedCount ? (playlistId as Domain.Playlist.PlaylistId) : null;
  }

  async deleteByUserId(userId: string) {
    const queryFilter = { user: userId };
    const foundDocs = await this._playlistModel.find(queryFilter, '_id').lean().exec();

    await this._playlistModel.deleteMany(queryFilter).exec();

    return {
      deletedIds: foundDocs.map((doc) => doc._id.toHexString() as Domain.Playlist.PlaylistId),
      total: foundDocs.length,
    };
  }

  async findById(playlistId: string) {
    const foundDoc = await this._playlistModel.findOne({ _id: playlistId }).lean<Playlist>().exec();

    return foundDoc ? PlaylistMapper.toDomainEntity(foundDoc) : null;
  }

  async getNextPlaylistIndexByUserId(userId: string): Promise<number> {
    const docsTotal = await this._playlistModel.countDocuments({ user: userId });

    return docsTotal + 1;
  }
}
