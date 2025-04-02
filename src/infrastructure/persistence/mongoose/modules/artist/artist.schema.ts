import { SchemaFactory } from '@nestjs/mongoose';
import { Artist } from './artist.document';

export const ArtistSchema = SchemaFactory.createForClass(Artist);
