interface IStudentModel{
    _id: string,
  
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    gander: string,
    address: string,
    createdIn: Date // not in frontend
    plans: string[],
    group: string
}
export default IStudentModel;

