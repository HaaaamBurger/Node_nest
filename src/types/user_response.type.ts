import { TUser } from "./user.type";

export type TUserResponse = {
  body: TUser,
  message: string,
}
export type TUserDataBase = TUser & { _userId: number };