import axios from "axios";
import appConfig from "../Utils/Config";
import IUsersModel from "../Models/IUsersModel";

class UsersService{

    async getAllUsers():Promise<IUsersModel[]>{
        let response = await axios.get<IUsersModel[]>( appConfig.users );
        return response.data;
    }

}
const usersService = new UsersService();
export default usersService;




