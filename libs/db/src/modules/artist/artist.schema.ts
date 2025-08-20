import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaDecorator } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Domain } from '@api.mabell/core';
import { BaseSchema } from '../../base/base.schema';

@SchemaDecorator({ versionKey: false, timestamps: true })
export class Artist extends BaseSchema {
  @Prop({ required: true, type: String })
  readonly name: string;

  @Prop({ required: false, type: String, default: null })
  readonly birthName: string | null;

  @Prop({ required: false, type: Date, default: null })
  readonly birthDate: Date | null;

  @Prop({ required: false, type: [{ type: String, enum: Domain.Common.Genres }] })
  readonly genres: Domain.Common.Genre[];

  @Prop({ required: false, type: String, default: '' })
  readonly biography: string;

  @Prop({ required: false, type: String, default: null })
  readonly avatar: string | null;

  @Prop({ required: false, type: String, default: null })
  readonly cover: string | null;

  @Prop({ required: false, type: String, default: null })
  readonly accentColor: string | null;

  @Prop({ required: false, type: String, default: null })
  readonly secondaryColor: string | null;

  @Prop({ required: false, type: Boolean, default: false })
  isActive: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  isPublic: boolean;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
