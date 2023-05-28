import axios from "axios";
import appConfig from "../Utils/Config";
import IUserModel from "../Models/IUserModel";

class UserServise {

    async getAllUsers(): Promise<IUserModel[]> {
        let response = await axios.get<IUserModel[]>(appConfig.users);
        return response.data;
    }

    async getUser(_id: string): Promise<IUserModel> {
        let response = await axios.get<IUserModel>(appConfig.users + _id);
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
       await axios.put<IUserModel[]>(appConfig.users, user);
    }

}
const userServise = new UserServise();
export default userServise;