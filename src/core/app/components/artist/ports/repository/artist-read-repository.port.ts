import { ArtistFilter } from './artist.filter';
import { ReadRepository } from '../../../../common/base/read-repository/read-repository.interface';
import { ArtistDTO } from './dtos/artist.dto';

export const ARTIST_READ_REPOSITORY_DI_TOKEN = Symbol('ARTIST_READ_REPOSITORY_DI_TOKEN');

export type ArtistReadRepository = ReadRepository<ArtistDTO, ArtistFilter>;
