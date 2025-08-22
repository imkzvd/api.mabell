import { Types } from 'mongoose';
import { Domain, App } from '@api.mabell/core';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { Artist } from './artist.schema';
import { ArtistDocument } from './types';

class ArtistMapper
  implements WriteMapper<Artist, Domain.Artist.Artist>, ReadMapper<Artist, App.DTOs.ArtistDTO>
{
  toPersistenceEntity(entity: Domain.Artist.Artist): Artist {
    return {
      _id: new Types.ObjectId(entity.getId()),
      name: entity.getName().value,
      birthName: entity.getBirthName()?.value || null,
      birthDate: entity.getBirthDate()?.value || null,
      genres: entity.getGenres().map(({ value }) => value),
      biography: entity.getBiography().value,
      avatar: entity.getAvatar(),
      cover: entity.getCover(),
      accentColor: entity.getAccentColor()?.value || null,
      secondaryColor: entity.getSecondaryColor()?.value || null,
      isActive: entity.getActiveStatus(),
      isPublic: entity.getPublicStatus(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }

  toDomainEntity(doc: Artist | ArtistDocument): Domain.Artist.Artist {
    return Domain.Artist.ArtistFactory.create({
      id: doc._id.toHexString() as Domain.Artist.ArtistId,
      name: doc.name,
      birtName: doc.birthName,
      birthDate: doc.birthDate,
      genres: doc.genres,
      biography: doc.biography,
      avatar: doc.avatar,
      cover: doc.cover,
      accentColor: doc.accentColor,
      secondaryColor: doc.secondaryColor,
      isActive: doc.isActive,
      isPublic: doc.isPublic,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDTO(doc: Artist | ArtistDocument): App.DTOs.ArtistDTO {
    return new App.DTOs.ArtistDTO(
      doc._id.toHexString() as Domain.Artist.ArtistId,
      doc.name,
      doc.birthName,
      doc.birthDate,
      doc.genres,
      doc.biography,
      doc.avatar,
      doc.cover,
      doc.accentColor,
      doc.secondaryColor,
      doc.isActive,
      doc.isPublic,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}

export default new ArtistMapper();
