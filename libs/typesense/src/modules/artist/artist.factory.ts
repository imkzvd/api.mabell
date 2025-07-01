import { ArtistDTO } from '@core/app/components/artist/dtos/artist.dto';
import { Artist } from './artist.document';

export class ArtistFactory {
  static create(dto: ArtistDTO) {
    return new Artist(dto.id, dto.name, dto.avatar || undefined, dto.isPublic);
  }
}
