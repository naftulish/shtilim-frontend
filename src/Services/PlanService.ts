import axios from "axios";
import appConfig from "../Utils/Config";
import IPlanModel from "../Models/IPlanModel";

class PlanServise {

    async getAllPlans(): Promise<IPlanModel[]> {
        let response = await axios.get<IPlanModel[]>(appConfig.plans);
        return response.data;
    }

    async getPlan(_id: string): Promise<IPlanModel> {
        let response = await axios.get<IPlanModel>(appConfig.plans + _id);
        return response.data;
    }

    async deletePlan(_id: string): Promise<void> {
        await axios.delete<void>(appConfig.plans + _id);
    }

    async updatePlan(_id: string ,plan: IPlanModel): Promise<IPlanModel> {
        let response = await axios.put<IPlanModel>(appConfig.plans + _id, plan);
        return response.data;
    }

    async addPlan(plan: IPlanModel): Promise<void> {
       await axios.post<IPlanModel[]>(appConfig.plans, plan);
    }

    // async getPlansByStudentId(studentId: string): Promise<IPlanModel[]> {
    //     const response = await axios.get<IPlanModel[]>(`${appConfig.plans}?studentId=${studentId}`);
    //     return response.data;
    //   }
      

}
const planServise = new PlanServise();
export default planServise;