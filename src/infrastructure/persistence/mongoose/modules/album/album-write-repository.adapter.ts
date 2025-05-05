import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album } from './album.schema';
import {
  Album as DomainAlbum,
  AlbumId,
} from '../../../../../core/domain/components/album/album.entity';
import { AlbumWriteRepository } from '../../../../../core/domain/components/album/repository/album-write-repository.port';
import AlbumMapper from './album.mapper';
import { AlbumDocument } from './types';

@Injectable()
export class AlbumWriteRepositoryAdapter implements AlbumWriteRepository {
  constructor(
    @InjectModel(Album.name)
    private readonly _albumModel: Model<AlbumDocument>,
  ) {}

  async save(entity: DomainAlbum): Promise<void> {
    const mappedDoc = AlbumMapper.toPersistenceEntity(entity);

    return this._albumModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<AlbumId | null> {
    const result = await this._albumModel.deleteOne({ _id: id }).exec();

    return result.deletedCount ? (id as AlbumId) : null;
  }

  async deleteByArtistId(artistId: string): Promise<{
    deletedIds: AlbumId[];
    total: number;
  }> {
    const foundDocs = await this._albumModel.find({ artists: artistId }, '_id').lean().exec();

    await this._albumModel.deleteMany({ artists: artistId }).exec();

    return {
      deletedIds: foundDocs.map((doc) => doc._id.toHexString() as AlbumId),
      total: foundDocs.length,
    };
  }

  async findById(id: string): Promise<DomainAlbum | null> {
    const foundDoc = await this._albumModel.findOne({ _id: id }).lean<Album>().exec();

    return foundDoc ? AlbumMapper.toDomainEntity(foundDoc) : null;
  }

  async getNextArtistAlbumIndex(artistId: string): Promise<number> {
    const totalDocs = await this._albumModel.countDocuments({ artists: artistId }).exec();

    return totalDocs + 1;
  }
}
