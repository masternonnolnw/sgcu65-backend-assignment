import { Injectable } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { TeamsService } from 'src/teams/teams.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AssignService {
  constructor(
    private readonly taskService: TasksService,
    private readonly teamService: TeamsService,
  ) {}
  async assign(taskId: string, teamId: string) {
    try {
      const getTask = await this.taskService.findOne(taskId);
      const getTeam = await this.teamService.findOne(teamId);

      let check = false;
      for (let i = 0; i < getTask.teams.length; i++) {
        if (getTask.teams[i] == getTeam.id) {
          check = true;
          break;
        }
      }
      if (!check) {
        getTask.teams.push(getTeam);
        getTeam.tasks.push(getTask);

        await getTask.save();
        await getTeam.save();
        return getTask.name + ' assigned to Team:' + getTeam.name;
      }
      return 'Already assigned';
    } catch (error) {
      console.log(error);
      return 'TaskId or TeamId wrong.';
    }
  }
}
