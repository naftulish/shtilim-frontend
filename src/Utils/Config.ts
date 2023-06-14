class AppConfig {
  public apiUrl: string = process.env.REACT_APP_API_URL || "";
  //  public apiUrl:string = "https://shtilim.onrender.com/api/"
  public users: string = this.apiUrl + "users/";
  public students: string = this.apiUrl + "students/";
  public groups: string = this.apiUrl + "groups/";
  public plans: string = this.apiUrl + "plans/";
  public activities: string = this.apiUrl + "activities/";
}

const appConfig = new AppConfig();
export default appConfig;