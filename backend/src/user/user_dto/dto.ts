import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreatedUpdatedModel } from "src/database/entities/common/created-updated.model";
import { UserEntity } from "src/database/entities/user.entity";

export class Dto {
  @ApiProperty({ required: true, example: "Alex" })
  @IsString()
  name: string;

  @ApiProperty({ required: true, example: 18 })
  @IsNumber()
  age: number;

  @ApiProperty({ required: false, example: true })
  @IsOptional()
  status: boolean;

  @ApiProperty({ required: true, example: "test@gmail.com", uniqueItems: true })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class DtoDataBase extends Dto{
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class UpdateAndDeleteDtoResponse {
  @ApiProperty()
  message: string;
  @ApiProperty()
  body: Dto;
  @ApiProperty()
  count: number;
}

export class queryParam {

}

export class DtoResponse{
  body: Dto;
  code: HttpStatus;
}