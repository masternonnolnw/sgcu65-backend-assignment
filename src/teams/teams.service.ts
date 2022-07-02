import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, TeamDocument } from './entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const createdTeam = new this.teamModel(createTeamDto);
    return await createdTeam.save();
  }

  async findAll() {
    return await this.teamModel.find().exec();
  }

  async findOne(id: string) {
    return await this.teamModel.findById(id).exec();
  }

  async update(id: string, updateteamDto: UpdateTeamDto) {
    return await this.teamModel.findByIdAndUpdate(id, updateteamDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.teamModel.findByIdAndRemove(id);
  }

  async search(name: string, id: string) {
    const allTeams = await this.teamModel.find().exec();
    const newAllTeams = [];
    for (let i = 0; i < allTeams.length; i++) {
      let check = true;
      if (name) {
        if (allTeams[i].name.toLowerCase().indexOf(name.toLowerCase()) <= -1) {
          check = false;
        }
      }
      if (id) {
        if (allTeams[i].id.toLowerCase().indexOf(id.toLowerCase()) <= -1) {
          check = false;
        }
      }
      if (check) {
        newAllTeams.push(allTeams[i]);
      }
    }
    return newAllTeams;
  }

  async assign(teamId: string, userId: string) {
    try {
      const getTeam = await this.findOne(teamId);
      const getUser = await this.userService.findOne(userId);

      let check = false;
      for (let i = 0; i < getTeam.users.length; i++) {
        if (getTeam.users[i] == getUser.id) {
          check = true;
          break;
        }
      }
      if (!check) {
        getTeam.users.push(getUser);
        getUser.teams.push(getTeam);

        await getTeam.save();
        await getUser.save();
        return getUser.email + ' add to Team: ' + getTeam.name;
      }
      return 'Already have this user';
    } catch (error) {
      console.log(error);
      return 'TeamId or UsersId wrong.';
    }
  }
}
