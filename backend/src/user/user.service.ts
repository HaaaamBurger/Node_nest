import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Dto, DtoDataBase, DtoResponse, UpdateAndDeleteDtoResponse } from "./user_dto/dto";
import { UserRepository } from './user.repository';
import { UserEntity } from 'src/database/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
  }

  public async getAllUsers(): Promise<DtoDataBase[]> {
    try {
      const users = await this.userRepository.find() as UserEntity[];
      return users;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async createUser(dto: Dto): Promise<DtoResponse> {
    try {
      const findUser = await this.userRepository.findOne({ where: { email: dto.email } });
      if (findUser) {
        throw new HttpException("User already exists!", HttpStatus.BAD_REQUEST);
      }
      const createdUser = this.userRepository.create(dto);
      await this.userRepository.save(createdUser);
      return {
        body: createdUser,
        code: HttpStatus.CREATED
      };
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  public async deleteUserById(id: string): Promise<UpdateAndDeleteDtoResponse> {
    try {
      const findUser = await this.userRepository.findOneById(id);
      if (!findUser) {
        throw new HttpException("No such a user!", HttpStatus.BAD_REQUEST);
      }
      const deletedUser =  await this.userRepository.delete(id) as DeleteResult;
      return {
        message: "User deleted!",
        body: findUser,
        count: deletedUser.affected
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  public async getUserById(id: string): Promise<DtoResponse> {
    try {
      const findUser = await this.userRepository.findOneById(id);
      if(!findUser) {
        throw new HttpException("No such a user!", HttpStatus.BAD_REQUEST);
      }
      return {
        body: findUser,
        code: HttpStatus.OK
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUserById(id: string, dto: Partial<Dto>) {
    try {
      const findUser = await this.userRepository.findOneById(id);
      if (!findUser) {
        throw new HttpException("No such a user!", HttpStatus.BAD_REQUEST);
      }

      const userForUpdate = await this.userRepository.update(id, dto) as UpdateResult;

      return {
        message: "User updated!",
        body: findUser,
        count: userForUpdate.affected
      }

    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

}
