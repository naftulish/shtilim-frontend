interface IUserModel{
    _id: string,
    name: string,
    age: number,
    role: Role
}
export default IUserModel;

enum Role {
    admin = "ADMIN",
    user = "USER"
}