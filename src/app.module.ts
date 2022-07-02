import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AssignModule } from './assign/assign.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TasksModule,
    AssignModule,
    TeamsModule,
  ],
})
export class AppModule {}
