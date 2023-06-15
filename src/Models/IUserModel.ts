interface IUserModel{
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    active: boolean,
    role: Role
}

export class UserModel{
  _id: string = '';
  firstName: string = '';
  lastName: string= '';
  email: string= '';
  active: boolean = false;
  role: Role = Role.user;
}

export enum Role {
  admin = "ADMIN",
  user = "USER"
}

export default IUserModel;


