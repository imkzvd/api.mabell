import { Types } from 'mongoose';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { Artist } from './artist.schema';
import { ArtistDocument } from './types';
import { Artist as DomainArtist } from '../../../../../src/core/domain/components/artist/artist.entity';
import { ArtistFactory } from '../../../../../src/core/domain/components/artist/artist.factory';
import { ArtistDTO } from '../../../../../src/core/domain/components/artist/repository/dtos/artist.dto';
import { ArtistId } from '../../../../../src/core/domain/components/artist/types';

class ArtistMapper implements WriteMapper<Artist, DomainArtist>, ReadMapper<Artist, ArtistDTO> {
  toPersistenceEntity(entity: DomainArtist): Artist {
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

  toDomainEntity(doc: Artist | ArtistDocument): DomainArtist {
    return ArtistFactory.create({
      id: doc._id.toHexString() as ArtistId,
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

  toDTO(doc: Artist | ArtistDocument): ArtistDTO {
    return new ArtistDTO(
      doc._id.toHexString() as ArtistId,
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
