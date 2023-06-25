interface IPlanModel {
    _id: string,
    name: string,
    description: string,
    reportingTime: number,
    reportingType: ReportingType,
    WhatIsSuccess: number,
    quiz: QuizModel[]
}

export class QuizModel {
    title: string = "";
    type: Type = Type.booleany;
    answer: string[] = [];
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
    hours = "שעתי",
    minutes = "דקתי"

}
