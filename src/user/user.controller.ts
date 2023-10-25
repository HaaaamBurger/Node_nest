import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TUser } from 'src/types/user.type';
import { UserService } from './user.service';
import { TUserDataBase } from 'src/types/user_response.type';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Get("/")
  public getAllUsers(): TUser[] {
    const users = this.userService.getAllUsers();
    return users;
  }

  @Get("/:id")
  public getUserById(
    @Param() idParam: {id: string},
  ): TUserDataBase {
    const user = this.userService.getUserById(idParam.id)
    return user;
  }

  @Post()
  public createUser(
    @Body() body: TUser,
  ) {
    const userResponse = this.userService.createUser(body);
    return userResponse;
  }

  @Delete("/:id")
  public deleteUserById(
    @Param() idParam: {id: string},
  ) {
    const { id } = idParam;
    const userResponse = this.userService.deleteUserById(id);
    return userResponse;
  }

  @Put("/:id")
  public updateUserById(
    @Param() idParam: {id: string},
    @Body() body: Partial<TUser>,
  ) {
    const {id} = idParam;
    const userResponse = this.userService.updateUserById(id, body);
    return userResponse;
  }

}
