import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Task } from 'src/tasks/entities/task.entity';
import { Team } from 'src/teams/entities/team.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  firstname: string;

  @Prop()
  surname: string;

  @Prop()
  salary: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }] })
  teams: Team[];

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
