import { Types } from 'mongoose';
import { Track as DomainArtist } from '@core/domain/components/track/track.entity';
import { TrackFactory } from '@core/domain/components/track/track.factory';
import { TrackWithAlbumAndArtistsDTO } from '@core/domain/components/track/repository/dtos/track-with-album-and-artists.dto';
import { TrackId } from '@core/domain/components/track/types';
import { AlbumId } from '@core/domain/components/album/types';
import { ArtistId } from '@core/domain/components/artist/types';
import { Track } from './track.schema';
import ArtistMapper from '../artist/artist.mapper';
import { TrackDocument, TrackWithAlbumAndArtists, TrackWithAlbumAndArtistsDocument } from './types';
import AlbumMapper from '../album/album.mapper';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';

class TrackMapper
  implements
    WriteMapper<Track, DomainArtist>,
    ReadMapper<TrackWithAlbumAndArtistsDocument, TrackWithAlbumAndArtistsDTO>
{
  toPersistenceEntity(entity: DomainArtist): Track {
    return {
      _id: new Types.ObjectId(entity.getId().toString()),
      name: entity.getName().value,
      album: new Types.ObjectId(entity.getAlbum()),
      trackNumber: entity.getTrackNumber(),
      artists: entity.getArtists().map((id) => new Types.ObjectId(id)),
      featArtists: entity.getFeaturedArtists().map((id) => new Types.ObjectId(id)),
      file: entity.getFile(),
      duration: entity.getDuration()?.value || null,
      isExplicit: entity.getExplicitStatus(),
      isActive: entity.getActiveStatus(),
      isPublic: entity.getPublicStatus(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }

  toDomainEntity(doc: Track | TrackDocument): DomainArtist {
    return TrackFactory.create({
      id: doc._id.toHexString() as TrackId,
      name: doc.name,
      album: doc.album.toHexString() as AlbumId,
      trackNumber: doc.trackNumber,
      artists: doc.artists.map((id) => id.toHexString() as ArtistId),
      featArtists: doc.featArtists.map((id) => id.toHexString() as ArtistId),
      file: doc.file,
      duration: doc.duration,
      isExplicit: doc.isExplicit,
      isActive: doc.isActive,
      isPublic: doc.isPublic,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDTO(doc: TrackWithAlbumAndArtists): TrackWithAlbumAndArtistsDTO {
    return new TrackWithAlbumAndArtistsDTO(
      doc._id.toHexString() as TrackId,
      doc.name,
      AlbumMapper.toDTO(doc.album),
      doc.trackNumber,
      doc.artists.map((artist) => ArtistMapper.toDTO(artist)),
      doc.featArtists.map((artist) => ArtistMapper.toDTO(artist)),
      doc.file,
      doc.duration,
      doc.isExplicit,
      doc.isActive,
      doc.isPublic,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}

export default new TrackMapper();
