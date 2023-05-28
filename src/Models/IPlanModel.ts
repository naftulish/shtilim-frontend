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

enum Type {
    booleany = "BOOLEAN",
    scalar = "SCALAR",
}

enum ReportingType {
    days = "DAILY",
    hours  = "HOURLY",
    minutes = "MINUTELY"
}