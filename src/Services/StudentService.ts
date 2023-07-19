import axios from 'axios';
import appConfig from '../Utils/Config';
import IStudentModel from '../Models/IStudentModel';

class StudentService {
  async getAllStudents(): Promise<IStudentModel[]> {
    const response = await axios.get<IStudentModel[]>(appConfig.students);
    return response.data;
  }

  async getStudent(_id: string): Promise<IStudentModel> {
    const response = await axios.get<IStudentModel>(appConfig.students + "student-by-id/" + _id);
    return response.data;
  }

  async deleteStudent(_id: string): Promise<void> {
    await axios.delete<void>(appConfig.students + _id);
  }

  async updateOneStudent(_id: string, student: IStudentModel): Promise<IStudentModel> {
    const response = await axios.put<IStudentModel>(appConfig.students + "update-by-id/" + _id, student);
    return response.data;
  }

  async addStudent(student: IStudentModel): Promise<void> {
    await axios.post<IStudentModel[]>(appConfig.students, student);
  }

  async addPlanToStudent(_id: string, plan: string): Promise<IStudentModel> {
    const response = await axios.put<IStudentModel>(appConfig.students + "add-plan-to-student/" + _id, { plan });
    return response.data;
  }

  async removePlanFromStudent(_id: string, plan: string): Promise<void> {
    await axios.put<void>(appConfig.students + "remove-plan-of-student/" + _id, { plan });
  }
}

const studentService = new StudentService();
export default studentService;
