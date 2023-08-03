interface IStudentModel{
    _id: string,
  
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    gender: string,
    address: string,
    plans: string[],
    group: string
}
export default IStudentModel;

