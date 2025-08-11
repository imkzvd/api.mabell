import { Types } from 'mongoose';
import {
  Album as DomainAlbum,
  AlbumWithArtistsDTO,
  AlbumFactory,
  AlbumId,
  ArtistId,
} from '@api.mabell/core';
import { AlbumDocument, AlbumWithArtists, AlbumWithArtistsDocument } from './types';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { Album } from './album.schema';
import ArtistMapper from '../artist/artist.mapper';

class AlbumMapper
  implements
    WriteMapper<Album, DomainAlbum>,
    ReadMapper<AlbumWithArtistsDocument, AlbumWithArtistsDTO>
{
  toPersistenceEntity(entity: DomainAlbum): Album {
    return {
      _id: new Types.ObjectId(entity.getId().toString()),
      name: entity.getName().value,
      artists: entity.getArtists().map((id) => new Types.ObjectId(id)),
      type: entity.getType().value,
      genres: entity.getGenres().map(({ value }) => value),
      cover: entity.getCover(),
      color: entity.getColor()?.value || null,
      description: entity.getDescription().value,
      releaseAt: entity.getReleaseDate()?.value || null,
      isActive: entity.getActiveStatus(),
      isPublic: entity.getPublicStatus(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }

  toDomainEntity(doc: Album | AlbumDocument): DomainAlbum {
    return AlbumFactory.create({
      id: doc._id.toHexString() as AlbumId,
      name: doc.name,
      artists: doc.artists.map((id) => id.toHexString() as ArtistId),
      type: doc.type,
      genres: doc.genres,
      cover: doc.cover,
      color: doc.color,
      description: doc.description,
      releaseAt: doc.releaseAt,
      isActive: doc.isActive,
      isPublic: doc.isPublic,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDTO(doc: AlbumWithArtists | AlbumWithArtistsDocument): AlbumWithArtistsDTO {
    return new AlbumWithArtistsDTO(
      doc._id.toHexString() as AlbumId,
      doc.name,
      doc.artists.map((i) => ArtistMapper.toDTO(i)),
      doc.type,
      doc.genres,
      doc.cover,
      doc.color,
      doc.description,
      doc.releaseAt,
      doc.isActive,
      doc.isPublic,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}

export default new AlbumMapper();
