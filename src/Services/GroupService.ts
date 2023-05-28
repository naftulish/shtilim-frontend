import axios from "axios";
import appConfig from "../Utils/Config";
import IGroupModel from "../Models/IGroupModel";

class GroupServise {

    async getAllGroups(): Promise<IGroupModel[]> {
        let response = await axios.get<IGroupModel[]>(appConfig.groups);
        return response.data;
    }

    async getGroup(_id: string): Promise<IGroupModel> {
        let response = await axios.get<IGroupModel>(appConfig.groups + _id);
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
       await axios.put<IGroupModel[]>(appConfig.groups, group);
    }

}
const groupServise = new GroupServise();
export default groupServise;