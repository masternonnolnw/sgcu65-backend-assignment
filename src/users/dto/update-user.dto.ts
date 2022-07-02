import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  salary: number;

  @IsNotEmpty()
  @ApiProperty()
  role: string;
}
