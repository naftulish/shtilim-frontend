// interface IPlanModel {
//     _id: string,
//     name: string,
//     description: string,
    
//     reportingType: ReportingType,

//     reportingTime: number,
  
//     quiz: QuizModel[]
// }
// export default IPlanModel;

// export class QuizModel {
//     title: string = "";
//     type: Type = Type.booleany;
//     answer: string[] = [];
// }

// export enum Type {
//     // booleany = "BOOLEAN",
//     // scalar = "SCALAR",

//     booleany = "תוכנית לפי הצלחה או לא",
//     scalar = "תוכנית לפי דירוג הצלחה",
// }

// export enum ReportingType {

//     days = "יומי",
//     hours = "שעתי",
//     minutes = "דקתי"

// }



export interface IPlanModel {
    _id: string;
    name: string;
    description: string;
    reportingType: ReportingType;
    reportingTime: ReportingTime;
    quiz: QuizModel[];
  }
  
  export class QuizModel {
    title: string = "";
    type: Type = Type.booleany;
    answer: string[] = [];
  }
  
  export enum Type {
    booleany = "תוכנית לפי הצלחה או לא",
    scalar = "תוכנית לפי דירוג הצלחה",
  }
  
  export enum ReportingType {
    days = "יומי",
    hours = "שעתי",
    minutes = "דקתי",
  }
  
  export interface ReportingTime {
    reportingTime: number;
    maxReportingTime: {
      [key in ReportingType]: number;
    };
  }
  
  export const defaultReportingTime: ReportingTime = {
    reportingTime: 0,
    maxReportingTime: {
      [ReportingType.days]: 30,
      [ReportingType.hours]: 36,
      [ReportingType.minutes]: 90,
    },
  };
  
  