import { Types } from 'mongoose';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { Track as TrackDocument } from './track.document';
import AlbumMapper from '../album/album.mapper';
import ArtistMapper from '../artist/artist.mapper';
import { Track, TrackId } from '../../../../../core/domain/components/track/track.entity';
import { TrackDTO } from '../../../../../core/app/components/track/dtos/track.dto';
import { SimplifiedTrackDTO } from '../../../../../core/app/components/track/dtos/simplified-track.dto';
import { TrackFactory } from '../../../../../core/domain/components/track/track.factory';
import { AlbumId } from '../../../../../core/domain/components/album/album.entity';
import { ArtistId } from '../../../../../core/domain/components/artist/artist.entity';
import { TrackPopulatedDocument } from './types';

class TrackMapper
  implements
    WriteMapper<TrackDocument, Track>,
    ReadMapper<TrackPopulatedDocument, TrackDTO, SimplifiedTrackDTO>
{
  toDocument(entity: Track): TrackDocument {
    return {
      _id: new Types.ObjectId(entity.getId().toString()),
      name: entity.getName().value,
      album: new Types.ObjectId(entity.getAlbum()),
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

  toEntity(doc: TrackDocument): Track {
    return TrackFactory.create({
      id: doc._id.toHexString() as TrackId,
      name: doc.name,
      album: doc.album.toHexString() as AlbumId,
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

  toDTO(doc: TrackPopulatedDocument): TrackDTO {
    return new TrackDTO(
      doc._id.toHexString(),
      doc.name,
      doc.album._id.toHexString(),
      AlbumMapper.toSimplifiedDTO(doc.album),
      doc.artists.map(({ _id }) => _id.toHexString()),
      doc.artists.map((artist) => ArtistMapper.toSimplifiedDTO(artist)),
      doc.featArtists.map(({ _id }) => _id.toHexString()),
      doc.featArtists.map((artist) => ArtistMapper.toSimplifiedDTO(artist)),
      doc.file,
      doc.duration,
      doc.isExplicit,
      doc.isActive,
      doc.isPublic,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  toSimplifiedDTO(doc: TrackPopulatedDocument): SimplifiedTrackDTO {
    return new SimplifiedTrackDTO(
      doc._id.toHexString(),
      doc.name,
      doc.album._id.toHexString(),
      doc.artists.map(({ _id }) => _id.toHexString()),
      doc.artists.map((artist) => ArtistMapper.toSimplifiedDTO(artist)),
      doc.featArtists.map(({ _id }) => _id.toHexString()),
      doc.featArtists.map((artist) => ArtistMapper.toSimplifiedDTO(artist)),
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
