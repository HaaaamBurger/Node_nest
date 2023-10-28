import { Controller, Get, Post, Body, Res, Delete, Param, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Dto, DtoDataBase, DtoResponse } from "./user_dto/dto"
import { ApiTags } from '@nestjs/swagger';


@ApiTags("User")
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {
  }
  @Get()
  public async getAllUsers(
    @Res() res: any,
  ): Promise<DtoDataBase[]> {
    const users = await this.userService.getAllUsers();
    return res.json(users);
  }

  @Post()
  public async createUser(
    @Body() body: Dto,
    @Res() res: any
  ): Promise<void> {
    const user = await this.userService.createUser(body) as DtoResponse;
    return res.status(HttpStatus.CREATED).json(user);
  }

  @Delete("/:id")
  public async deleteUserById(
    @Param() idParam: { id: string },
    @Res() res: any
  ): Promise<void> {
    const { id } = idParam;
    const deletedUserInfo = await this.userService.deleteUserById(id);
    res.status(HttpStatus.OK).json(deletedUserInfo);
  }

  @Get()
  public async getUserById(
    @Param() idParam: { id: string },
    @Res() res: any
  ) {
    const { id } = idParam;

    const user = await

    res.status(HttpStatus.OK).json();
  }

}
