import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArtistWriteRepository as ArtistWriteRepositoryPort } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { Artist as DomainArtist } from '@core/domain/components/artist/artist.entity';
import { ArtistId } from '@core/domain/components/artist/types';
import { Artist } from './artist.schema';
import { ArtistDocument } from './types';
import ArtistMapper from './artist.mapper';

@Injectable()
export class ArtistWriteRepository implements ArtistWriteRepositoryPort {
  constructor(
    @InjectModel(Artist.name)
    private readonly _artistModel: Model<ArtistDocument>,
  ) {}

  async save(entity: DomainArtist): Promise<void> {
    const mappedDoc = ArtistMapper.toPersistenceEntity(entity);

    return this._artistModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<ArtistId | null> {
    const result = await this._artistModel.deleteOne({ _id: id }).exec();

    return result.deletedCount ? (id as ArtistId) : null;
  }

  async findById(id: string): Promise<DomainArtist | null> {
    const foundDoc = await this._artistModel.findOne({ _id: id }).lean<Artist>().exec();

    return foundDoc ? ArtistMapper.toDomainEntity(foundDoc) : null;
  }

  async findByIds(ids: string[]): Promise<{
    items: DomainArtist[];
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }> {
    const foundDocs = await this._artistModel.find({ _id: ids }).lean<Artist[]>();
    const docsMap: Map<string, Artist> = new Map(foundDocs.map((doc) => [doc._id.toString(), doc]));
    const sortedDocs = ids.map((id) => docsMap.get(id)!);
    const foundDocIds = sortedDocs.map((doc) => doc._id.toHexString());
    const missingDocIds = ids.filter((id) => !foundDocIds.includes(id));

    return {
      items: sortedDocs.map((doc) => ArtistMapper.toDomainEntity(doc)),
      foundIds: foundDocIds as ArtistId[],
      total: foundDocIds.length,
      missingIds: missingDocIds,
    };
  }

  async existsById(id: string): Promise<ArtistId | null> {
    const foundDoc = await this._artistModel.exists({ _id: id });

    return foundDoc ? (foundDoc._id.toHexString() as ArtistId) : null;
  }

  async existsByIds(ids: string[]): Promise<{
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }> {
    const foundDocs = await this._artistModel.find({ _id: ids }, '_id');
    const foundIds = new Set(foundDocs.map((doc) => doc._id.toString()));

    return {
      foundIds: [...foundIds] as ArtistId[],
      total: foundIds.size,
      missingIds: ids.filter((id) => !foundIds.has(id)),
    };
  }

  async getNextIndex(): Promise<number> {
    return (await this._artistModel.countDocuments()) + 1;
  }
}
