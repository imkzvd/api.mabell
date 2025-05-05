import { Types } from 'mongoose';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { Album } from './album.schema';
import {
  Album as DomainAlbum,
  AlbumId,
} from '../../../../../core/domain/components/album/album.entity';
import { AlbumFactory } from '../../../../../core/domain/components/album/album.factory';
import { ArtistId } from '../../../../../core/domain/components/artist/artist.entity';
import ArtistMapper from '../artist/artist.mapper';
import { AlbumDocument, AlbumWithArtists, AlbumWithArtistsDocument } from './types';
import { AlbumWithArtistsDTO } from '../../../../../core/app/components/album/ports/repository/dtos/album-with-artists.dto';

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
      doc._id.toHexString(),
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
