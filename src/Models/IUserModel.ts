interface IUserModel{
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    active: boolean,
    role: Role
}



export enum Role {
  admin = "ADMIN",
  user = "USER"
}

export default IUserModel;


