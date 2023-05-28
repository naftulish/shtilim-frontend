
import axios from "axios";
import appConfig from "../Utils/Config";
import IStudentModel from "../Models/IStudentModel";

class StudentsServise {


    async getAllStudents(): Promise<IStudentModel[]> {
        let response = await axios.get<IStudentModel[]>(appConfig.students);
        return response.data;
    }

    async getStudent(_id: string): Promise<IStudentModel> {
        let response = await axios.get<IStudentModel>(appConfig.students + _id);
        return response.data;
    }

    async deleteStudent(_id: string): Promise<void> {
        await axios.delete<void>(appConfig.students + _id);
    }

    async updateStudent(_id: string ,student: IStudentModel): Promise<IStudentModel> {
        let response = await axios.put<IStudentModel>(appConfig.students + _id, student);
        return response.data;
        }

    async addStudent(student: IStudentModel): Promise<void> {
       await axios.put<IStudentModel[]>(appConfig.students, student);
    }

}
const studentsServise = new StudentsServise();
export default studentsServise;
