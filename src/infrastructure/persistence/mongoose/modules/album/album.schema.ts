import { SchemaFactory } from '@nestjs/mongoose';
import { Album } from './album.document';

export const AlbumSchema = SchemaFactory.createForClass(Album);
