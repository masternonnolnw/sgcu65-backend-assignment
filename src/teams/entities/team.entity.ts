import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.schema';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
