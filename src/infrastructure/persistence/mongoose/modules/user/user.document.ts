import { Schema } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Prop } from '@nestjs/mongoose';
import { BasePersonDocument } from '../../base/base-person-document.abstract';
import { Regions, Region } from '../../../../../core/domain/common/constants/regions';
import { Genres, Genre } from '../../../../../core/domain/common/constants/genres';

@Schema({ versionKey: false, timestamps: true })
export class User extends BasePersonDocument {
  @Prop({ required: false, type: String, default: null })
  email: string | null;

  @Prop({ required: false, type: Date, default: new Date() })
  birthDate: Date;

  @Prop({
    required: false,
    type: String,
    enum: Regions,
    default: Regions['Russian Federation'],
  })
  region: Region;

  @Prop({ required: false, type: [{ type: String, enum: Genres }] })
  genres: Genre[];

  @Prop({ required: false, type: String, default: null })
  avatar: string | null;

  @Prop({ required: false, type: String, default: null })
  color: string | null;

  @Prop({ required: false, type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  isPremium: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  isPublic: boolean;
}
