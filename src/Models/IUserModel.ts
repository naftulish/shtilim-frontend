interface IUserModel{
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: Role

}
export default IUserModel;

enum Role {
    admin = "ADMIN",
    user = "USER"
}