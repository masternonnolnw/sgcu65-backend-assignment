import { Module } from '@nestjs/common';
import { AssignService } from './assign.service';
import { AssignController } from './assign.controller';
import { TasksModule } from 'src/tasks/tasks.module';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [TasksModule, TeamsModule],
  controllers: [AssignController],
  providers: [AssignService],
})
export class AssignModule {}
