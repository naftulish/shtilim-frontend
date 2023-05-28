
import axios from "axios";
import appConfig from "../Utils/Config";
import IActivityModel from "../Models/IActivityModel";

class ActivityService {

    async getAllActivities(): Promise<IActivityModel[]> {
        let response = await axios.get<IActivityModel[]>(appConfig.activities);
        return response.data;
    }

    async getActivity(_id: string): Promise<IActivityModel> {
        let response = await axios.get<IActivityModel>(appConfig.activities + _id);
        return response.data;
    }

    async deleteActivity(_id: string): Promise<void> {
        await axios.delete<void>(appConfig.activities + _id);
    }

    async updateActivity(_id: string ,activity: IActivityModel): Promise<IActivityModel> {
        let response = await axios.put<IActivityModel>(appConfig.activities + _id, activity);
        return response.data;
        }

    async addActivity(activity: IActivityModel): Promise<void> {
       await axios.put<IActivityModel[]>(appConfig.activities, activity);
    }

}
const activityService = new ActivityService();
export default activityService;
