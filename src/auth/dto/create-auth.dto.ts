/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  surname: string;

  @IsNotEmpty()
  @ApiProperty()
  salary: number;

  @IsNotEmpty()
  @ApiProperty()
  role: string;
}
