import { Controller, Get, Post, Body, Res, Delete, Param, HttpStatus, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Dto, DtoDataBase, DtoResponse, UpdateAndDeleteDtoResponse } from "./user_dto/dto"
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags("User")
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {
  }
  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: DtoDataBase })
  public async getAllUsers(
    @Res() res: any,
  ): Promise<DtoDataBase[]> {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: DtoDataBase })
  @Post()
  public async createUser(
    @Body() body: Dto,
    @Res() res: any
  ): Promise<void> {
    const user = await this.userService.createUser(body) as DtoResponse;
    return res.status(HttpStatus.CREATED).json(user);
  }

  @Delete("/:id")
  @ApiResponse({ status: HttpStatus.OK, type: UpdateAndDeleteDtoResponse })
  public async deleteUserById(
    @Param() idParam: { id: string },
    @Res() res: any
  ): Promise<void> {
    const { id } = idParam;
    const deletedUserInfo = await this.userService.deleteUserById(id);
    res.status(HttpStatus.OK).json(deletedUserInfo);
  }

  @Get("/:id")
  public async getUserById(
    @Param() idParam: { id: string },
    @Res() res: any
  ) {
    const { id } = idParam;
    const user = await this.userService.getUserById(id);

    res.status(HttpStatus.OK).json(user);
  }

  @Put("/:id")
  public async updateUserById(
    @Param() idParam: { id: string },
    @Res() res: any,
    @Body() dto: Partial<Dto>
  ) {
    const { id } = idParam;
    const updatedUserInfo = await this.userService.updateUserById(id, dto);
    res.status(HttpStatus.OK).json(updatedUserInfo);
  }

}
