interface IStudentModel{
    _id: string,
  
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    gender: string,
    address: string,
    readonly createdIn?: Date;
    // createdIn: Date // not in frontend
    plans: string[],
    group: string
}
export default IStudentModel;

