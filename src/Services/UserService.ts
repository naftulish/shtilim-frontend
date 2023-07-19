import axios from "axios";
import appConfig from "../Utils/Config";
import jwtDecode from "jwt-decode";
import IUserModel, { Role } from "../Models/IUserModel";

class UserService {
  async getAllUsers(): Promise<IUserModel[]> {
    const response = await axios.get<IUserModel[]>(appConfig.users);
    return response.data;
  }

  async getUserById(_id: string): Promise<IUserModel> {
//     const response = await axios.get<IUserModel>(`${appConfig.users}/${_id}`);
//     return response.data;
//   }
        let response = await axios.get<IUserModel>(appConfig.users + "user-by-id/" + _id);
        return response.data;
    }

  // async getUserByEmail(email: string): Promise<IUserModel> {
  //   const response = await axios.get<IUserModel>(appConfig.users, {
  //     params: { email },
  //   });
  //   return response.data;
  // }

  async getUserExistsByEmail(email: string): Promise<boolean> {
    const response = await axios.get<boolean>(appConfig.users + "user-by-email/:email", {
      params: { email },
    });
    return response.data;
  }
  

  async getUserByRole(role: Role): Promise<IUserModel[]> {
    const response = await axios.get<IUserModel[]>(appConfig.users, {
      params: { role },
    });
    return response.data;
  }

  async deleteUser(_id: string): Promise<void> {
    await axios.delete<void>(`${appConfig.users}${_id}`);
  }

  async updateOneUser(_id: string, user: IUserModel): Promise<IUserModel> {
    const response = await axios.put<IUserModel>(appConfig.users + "update-by-id/" + _id, user);
    return response.data;
  }

  async addUser(user: IUserModel): Promise<IUserModel> {
    const response = await axios.post<IUserModel>(appConfig.register, user);
    return response.data;
  }

  async login(email: string, password: string): Promise<string> {
    const response = await axios.post<string>(appConfig.login, {email, password});
    return response.data;
  }

  getUserFromToken(): IUserModel {
    const token = localStorage.getItem("token");
    let user = null;
    if (token) {
      const payloadJwt: any = jwtDecode(token);
      user = payloadJwt.user;
    }
    return user;
  }

}

const userService = new UserService();
export default userService;
