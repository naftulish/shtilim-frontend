interface IPlanModel{
    _id: number,
    name: string,
    description: string,
    type: Type,
    gradeDescription: string[],
    reportingTime :number,
    reportingType :ReportingType,
    WhatIsSuccess :number
}
export default IPlanModel;

export enum Type {
    // booleany = "BOOLEAN",
    // scalar = "SCALAR",

    booleany = "תוכנית לפי הצלחה או לא",
    scalar = "תוכנית לפי דירוג הצלחה",
}

export enum ReportingType {
    // days = "DAILY",
    // hours  = "HOURLY",
    // minutes = "MINUTELY"

        days = "יומי",
    hours  = "שעתי",
    minutes = "דקתי"

}




// enum Type {
//     booleany = "BOOLEAN",
//     scalar = "SCALAR",
// }

// enum ReportingType {
//     days = "DAILY",
//     hours  = "HOURLY",
//     minutes = "MINUTELY"
// }

// // 1. interface
// export interface IPlansModel extends mongoose.Document{
//     name: string,
//     description: string,
//     type: Type,
//     gradeDescription: string[],
//     reportingTime :number,
//     reportingType :ReportingType,
//     WhatIsSuccess :number
// }