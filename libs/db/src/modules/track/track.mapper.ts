import { Types } from 'mongoose';
import { Domain, App } from '@api.mabell/core';
import { Track } from './track.schema';
import ArtistMapper from '../artist/artist.mapper';
import { TrackDocument, TrackWithAlbumAndArtists, TrackWithAlbumAndArtistsDocument } from './types';
import AlbumMapper from '../album/album.mapper';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';

class TrackMapper
  implements
    WriteMapper<Track, Domain.Track.Track>,
    ReadMapper<TrackWithAlbumAndArtistsDocument, App.DTOs.TrackWithAlbumDTO>
{
  toPersistenceEntity(entity: Domain.Track.Track): Track {
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

  toDomainEntity(doc: Track | TrackDocument): Domain.Track.Track {
    return Domain.Track.TrackFactory.create({
      id: doc._id.toHexString() as Domain.Track.TrackId,
      name: doc.name,
      album: doc.album.toHexString() as Domain.Album.AlbumId,
      trackNumber: doc.trackNumber,
      artists: doc.artists.map((id) => id.toHexString() as Domain.Artist.ArtistId),
      featArtists: doc.featArtists.map((id) => id.toHexString() as Domain.Artist.ArtistId),
      file: doc.file,
      duration: doc.duration,
      isExplicit: doc.isExplicit,
      isActive: doc.isActive,
      isPublic: doc.isPublic,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDTO(doc: TrackWithAlbumAndArtists) {
    return new App.DTOs.TrackWithAlbumDTO(
      doc._id.toHexString() as Domain.Track.TrackId,
      doc.name,
      AlbumMapper.toDTO(doc.album),
      doc.featArtists.map((artist) => ArtistMapper.toDTO(artist)),
      doc.file,
      doc.duration,
      doc.trackNumber,
      doc.isExplicit,
      doc.isActive,
      doc.isPublic,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}

export default new TrackMapper();
