import { WriteRepository } from '../../../common/repository/write-repository.interface';
import { Artist, ArtistId } from '../artist.entity';
import { ArtistFilter } from './artist.filter';

export const ARTIST_WRITE_REPOSITORY_DI_TOKEN = Symbol('ARTIST_WRITE_REPOSITORY_DI_TOKEN');

export type ArtistWriteRepository = WriteRepository<Artist, ArtistId, ArtistFilter>;
