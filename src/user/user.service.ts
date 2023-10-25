import { Injectable } from '@nestjs/common';
import { TUserResponse,TUserDataBase } from "../types/user_response.type"
import { TUser } from 'src/types/user.type';

@Injectable()
export class UserService {
  private users = [] as TUserDataBase[];

  public createUser(dto: TUser): TUserResponse {
    this.users.push({ ...dto, _userId: this.users.length + 1 });
    const cretedUser = this.users[this.users.length - 1];

    return {
      body: cretedUser,
      message: "User created!"
    };
  }
  public getAllUsers(): TUserDataBase[] {
    return this.users;
  }
  public getUserById(id: string): TUserDataBase {
    const user = this.users.find(dto => dto._userId === Number(id));
    return user;
  }
  public deleteUserById(id: string): TUserResponse {
    const userForDelete = this.users.find(dto => dto._userId === Number(id));
    this.users = this.users.filter(dto => dto._userId !== Number(id));
    return {
      body: userForDelete,
      message: "User deleted!"
    }
  }
}
