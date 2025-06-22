import { Schema } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import {
  AdminRoles,
  AdminRole,
} from '../../../../../core/domain/components/admin/constants/admin-roles';
import { BasePersonSchema } from '../../base/base-person.schema';

@Schema({ versionKey: false, timestamps: true })
export class Admin extends BasePersonSchema {
  @Prop({
    required: false,
    type: String,
    enum: AdminRoles,
    default: AdminRoles.Guest,
  })
  public readonly role: AdminRole;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
