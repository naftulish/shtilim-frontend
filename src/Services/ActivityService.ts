
// import axios from "axios";
// import appConfig from "../Utils/Config";
// import IActivityModel from "../Models/IActivityModel";

// class ActivityService {

//     async getAllActivities(): Promise<IActivityModel[]> {
//         let response = await axios.get<IActivityModel[]>(appConfig.activities);
//         return response.data;
//     }

//     async getActivity(_id: string): Promise<IActivityModel> {
//         let response = await axios.get<IActivityModel>(appConfig.activities + _id);
//         return response.data;
//     }

//     async deleteActivity(_id: string): Promise<void> {
//         await axios.delete<void>(appConfig.activities + _id);
//     }

//     async updateActivity(_id: string ,activity: IActivityModel): Promise<IActivityModel> {
//         let response = await axios.put<IActivityModel>(appConfig.activities + _id, activity);
//         return response.data;
//         }

//     async addActivity(activity: IActivityModel): Promise<void> {
//        await axios.post<IActivityModel[]>(appConfig.activities, activity);
//     }

// }
// const activityService = new ActivityService();
// export default activityService;

import axios from "axios";
import appConfig from "../Utils/Config";
import IActivityModel from "../Models/IActivityModel";

class ActivityService {
  async getAllActivities(): Promise<IActivityModel[]> {
    let response = await axios.get<IActivityModel[]>(`${appConfig.activities}`);
    return response.data;
  }

  async getActivityById(_id: string): Promise<IActivityModel> {
    let response = await axios.get<IActivityModel>(`${appConfig.activities}/activitiy-by-id/${_id}`);
    return response.data;
  }

  async getActivitiesByPlan(plan: string): Promise<IActivityModel[]> {
    let response = await axios.get<IActivityModel[]>(`${appConfig.activities}/activities-by-plan/${plan}`);
    return response.data;
  }

  async getActivitiesByStudent(student: string): Promise<IActivityModel[]> {
    let response = await axios.get<IActivityModel[]>(`${appConfig.activities}/activities-by-student/${student}`);
    return response.data;
  }

  // async getActivitiesByPlanAndStudent(plan: string, student: string): Promise<IActivityModel[]> {
  //   let response = await axios.get<IActivityModel[]>(`${appConfig.activities}/activities-by-plan-and-student/${plan}/${student}`);
  //   return response.data;
  // }

  async getActivitiesByPlanAndStudent(plan: string, student: string): Promise<IActivityModel[]> {
    let response = await axios.get<IActivityModel[]>(`${appConfig.activities}activities-by-plan-and-student/${plan}/${student}`);
    return response.data;
  }
  

  async updateActivity(_id: string, activity: IActivityModel): Promise<IActivityModel> {
    let response = await axios.put<IActivityModel>(`${appConfig.activities}/update-by-id/${_id}`, activity);
    return response.data;
  }

  async deleteActivity(_id: string): Promise<void> {
    await axios.delete<void>(`${appConfig.activities}/${_id}`);
  }

  async addActivity(activity: IActivityModel): Promise<IActivityModel> {
    let response = await axios.post<IActivityModel>(`${appConfig.activities}`, activity);
    return response.data;
  }
}

const activityService = new ActivityService();
export default activityService;
