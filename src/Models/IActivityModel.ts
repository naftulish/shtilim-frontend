interface IActivityModel{
    _id?:string,
    planId: string,
    studentId: string,
    grade: number[],
    createdIn?: string,
    userId: string
}
export default IActivityModel;

