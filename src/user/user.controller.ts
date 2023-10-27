import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Dto } from "./user_dto/dto"

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Get("/")
  public getAllUsers(){
    return this.userService.getAllUsers();
  }

  @Get("/:id")
  public getUserById(
    @Param() idParam: {id: string},
  ) {
    return this.userService.getUserById(idParam.id)
  }

  @Post()
  public createUser(
    @Body() body: Dto,
  ) {
    return this.userService.createUser(body);
  }

  @Delete("/:id")
  public deleteUserById(
    @Param() idParam: {id: string},
  ) {
    const { id } = idParam;
    return this.userService.deleteUserById(id);
  }

  @Put("/:id")
  public updateUserById(
    @Param() idParam: {id: string},
    @Body() body: Dto,
  ) {
    const {id} = idParam;
    return this.userService.updateUserById(id, body);
  }

}
