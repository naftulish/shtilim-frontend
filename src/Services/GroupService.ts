import axios from "axios";
import appConfig from "../Utils/Config";
import IGroupModel from "../Models/IGroupModel";
import userService from "./UserService";

class GroupServise {

    async getAllGroups(): Promise<IGroupModel[]> {
        let response = await axios.get<IGroupModel[]>(appConfig.groups);
        return response.data;
    }

    async getGroup(_id: string): Promise<IGroupModel> {
        let response = await axios.get<IGroupModel>(appConfig.groups + "group-by-id/" + _id);
        return response.data;
    }

    async deleteGroup(_id: string): Promise<void> {
        await axios.delete<void>(appConfig.groups + _id);
    }

    async updateGroup(_id: string ,group: IGroupModel): Promise<IGroupModel> {
        let response = await axios.put<IGroupModel>(appConfig.groups + _id, group);
        return response.data;
        }

    async addGroup(group: IGroupModel): Promise<void> {
       await axios.post<IGroupModel[]>(appConfig.groups, group);
    }

    // New function to fetch groups by reporter's user ID
    async getAllGroupsByReporter(): Promise<IGroupModel[]> {
        const reporterId = userService.getUserFromToken()?._id;
        if (!reporterId) {
            throw new Error("Reporter ID not available");
        }
        let response = await axios.get<IGroupModel[]>(`${appConfig.groups}/by-teacher/${reporterId}`);
        return response.data;
    }

}
const groupServise = new GroupServise();
export default groupServise;