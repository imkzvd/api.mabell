import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist } from './playlist.schema';
import {
  Playlist as DomainPlaylist,
  PlaylistId,
} from '../../../../../core/domain/components/playlist/playlist.entity';
import { PlaylistWriteRepository } from '../../../../../core/domain/components/playlist/repository/playlist-write-repository.port';
import PlaylistMapper from './playlist.mapper';
import { PlaylistDocument } from './types';

@Injectable()
export class PlaylistWriteRepositoryAdapter implements PlaylistWriteRepository {
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

  async findById(id: string): Promise<DomainPlaylist | null> {
    const foundDoc = await this._playlistModel.findOne({ _id: id }).lean<Playlist>().exec();

    return foundDoc ? PlaylistMapper.toDomainEntity(foundDoc) : null;
  }

  async getNextPlaylistIndexByOwnerId(ownerId: string): Promise<number> {
    const docsTotal = await this._playlistModel.countDocuments({ owner: ownerId });

    return docsTotal + 1;
  }
}
