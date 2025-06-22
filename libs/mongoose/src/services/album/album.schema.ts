import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaDecorator } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Schema, Types } from 'mongoose';
import { BaseSchema } from '../../base/base.schema';
import { Artist } from '../artist/artist.schema';
import {
  AlbumType,
  AlbumTypes,
} from '../../../../../src/core/domain/components/album/constants/album-types';
import { Genre, Genres } from '../../../../../src/core/domain/common/constants/genres';

@SchemaDecorator({ versionKey: false, timestamps: true })
export class Album extends BaseSchema {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({
    required: true,
    type: [{ type: Schema.Types.ObjectId, ref: Artist.name }],
  })
  artists: Types.ObjectId[];

  @Prop({ required: true, type: String, enum: AlbumTypes })
  type: AlbumType;

  @Prop({ required: true, type: [{ type: String, enum: Genres }] })
  genres: Genre[];

  @Prop({ required: false, type: String, default: null })
  cover: string | null;

  @Prop({ required: false, type: String, default: null })
  color: string | null;

  @Prop({ required: false, type: String, default: '' })
  description: string;

  @Prop({ required: false, type: Date, default: null })
  releaseAt: Date | null;

  @Prop({ required: false, type: Boolean, default: false })
  isActive: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  isPublic: boolean;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
