interface IPlanModel {
    _id: string,
    name: string,
    description: string,
    reportingTime: number,
    reportingType: ReportingType,
    quiz: QuizModel[]
}
export default IPlanModel;

export class QuizModel {
    title: string = "";
    type: Type = Type.booleany;
    answer: string[] = [];
}

export enum Type {
    // booleany = "BOOLEAN",
    // scalar = "SCALAR",

    booleany = "תוכנית לפי הצלחה או לא",
    scalar = "תוכנית לפי דירוג הצלחה",
}

export enum ReportingType {

    days = "יומי",
    hours = "שעתי",
    minutes = "דקתי"

}
