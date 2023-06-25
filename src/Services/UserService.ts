// first version
import axios from "axios";
import appConfig from "../Utils/Config";
import IUserModel, { Role } from "../Models/IUserModel";

class UserServise {

    async getAllUsers(): Promise<IUserModel[]> {
        let response = await axios.get<IUserModel[]>(appConfig.users);
        return response.data;
    }

    async getUser(_id: string): Promise<IUserModel> {
        let response = await axios.get<IUserModel[]>(appConfig.users + _id);
        return response.data[0];
    }

    // The function getUserByEmail gets a user object from the backend API by their email address.
    async getUserByEmail(email: string): Promise<IUserModel> {
        let response = await axios.get<IUserModel>(appConfig.users + "?email=" + email);
        return response.data;
    }
    

    async getUserByRole(role: Role): Promise<IUserModel[]> {
        let response = await axios.get<IUserModel[]>(appConfig.users + "?role=" + role);
        return response.data;
    }

    async deleteUser(_id: string): Promise<void> {
        await axios.delete<void>(appConfig.users + _id);
    }

    async updateUser(_id: string ,user: IUserModel): Promise<IUserModel> {
        let response = await axios.put<IUserModel>(appConfig.users + _id, user);
        return response.data;
    }

    async addUser(user: IUserModel): Promise<void> {
       let response = await axios.post(appConfig.users, user);
       return response.data;

    }

}
const userServise = new UserServise();
export default userServise;


