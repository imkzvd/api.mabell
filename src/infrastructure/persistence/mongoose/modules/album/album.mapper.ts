import { Types } from 'mongoose';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { Album as AlbumDocument } from './album.document';
import { Album, AlbumId } from '../../../../../core/domain/components/album/album.entity';
import { AlbumFactory } from '../../../../../core/domain/components/album/album.factory';
import { ArtistId } from '../../../../../core/domain/components/artist/artist.entity';
import ArtistMapper from '../artist/artist.mapper';
import { AlbumWithArtistsDocument } from './types';
import { TrackId } from '../../../../../core/domain/components/track/track.entity';
import { AlbumDTO } from '../../../../../core/app/components/album/ports/repository/dtos/album.dto';
import { AlbumWithArtistsDTO } from '../../../../../core/app/components/album/ports/repository/dtos/album-with-artists.dto';

class AlbumMapper
  implements
    WriteMapper<AlbumDocument, Album>,
    ReadMapper<AlbumDocument, AlbumDTO, AlbumWithArtistsDocument, AlbumWithArtistsDTO>
{
  toDocument(entity: Album): AlbumDocument {
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
      tracks: entity.getTracks(),
      isActive: entity.getActiveStatus(),
      isPublic: entity.getPublicStatus(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }

  toEntity(doc: AlbumDocument): Album {
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
      tracks: doc.tracks as TrackId[],
      isActive: doc.isActive,
      isPublic: doc.isPublic,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDTO(doc: AlbumDocument): AlbumDTO {
    return new AlbumDTO(
      doc._id.toHexString(),
      doc.name,
      doc.artists.map((id) => id.toHexString()),
      doc.type,
      doc.genres,
      doc.cover,
      doc.color,
      doc.description,
      doc.releaseAt,
      doc.tracks,
      doc.isActive,
      doc.isPublic,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  toPopulatedDTO(doc: AlbumWithArtistsDocument): AlbumWithArtistsDTO {
    return new AlbumWithArtistsDTO(
      doc._id.toHexString(),
      doc.name,
      doc.artists.map((artist) => ArtistMapper.toDTO(artist)),
      doc.type,
      doc.genres,
      doc.cover,
      doc.color,
      doc.description,
      doc.releaseAt,
      doc.tracks,
      doc.isActive,
      doc.isPublic,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}

export default new AlbumMapper();
