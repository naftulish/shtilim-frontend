// first version
import axios from "axios";
import appConfig from "../Utils/Config";
import IUserModel from "../Models/IUserModel";

class UserServise {

    async getAllUsers(): Promise<IUserModel[]> {
        let response = await axios.get<IUserModel[]>(appConfig.users);
        return response.data;
    }

    // async getUser(_id: string): Promise<IUserModel> {
    //     let response = await axios.get<IUserModel>(appConfig.users + _id);
    //     return response.data;
    // }

    async getUser(userId: string): Promise<IUserModel> {
        try {
          const response = await axios.get<IUserModel>(`${appConfig.users + userId}`);
          return response.data;
        } catch (error) {
          throw new Error('Failed to fetch user');
        }
      }
      

    // The function getUserByEmail gets a user object from the backend API by their email address.
    async getUserByEmail(email: string): Promise<IUserModel> {
        let response = await axios.get<IUserModel>(appConfig.users + "?email=" + email);
        return response.data;
    }
    

    async deleteUser(_id: string): Promise<void> {
        await axios.delete<void>(appConfig.users + _id);
    }

    async updateUser(user: IUserModel): Promise<IUserModel> {
        try {
          const response = await axios.put<IUserModel>(`${appConfig.users}`, user);
        //   `${appConfig.users}${user._id}`, user
          return response.data;
        } catch (error) {
          throw new Error('Failed to update the user');
        }
      }
      
    // async updateUser(user: IUserModel): Promise<IUserModel> {
    //     console.log
    //     let response = await axios.put<IUserModel>(`${appConfig.users}/${user._id}`, user);
    //     return response.data;
    // }
      

    async addUser(user: IUserModel): Promise<boolean> {
       let response = await axios.post(appConfig.users, user);
       return response.data;
    }

}
const userServise = new UserServise();
export default userServise;


