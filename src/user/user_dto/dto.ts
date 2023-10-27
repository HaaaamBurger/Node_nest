export class Dto {
  name: string;
  age: number;
  status: boolean;
  email: string;
}

export class DtoDataBase{
  name: string;
  age: number;
  status: boolean;
  _userId: string;
}

export class DtoResponse{
  body: Dto;
  message: string;
}