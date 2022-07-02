import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
