interface IStudentModel{
    _id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    plans: string[],
    group: string
}
export default IStudentModel;

export interface IList{
    list: FileList;
    test: boolean
  }