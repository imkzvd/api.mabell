import { HydratedDocument } from 'mongoose';
import { Artist } from './artist.schema';

export type ArtistDocument = HydratedDocument<Artist>;
