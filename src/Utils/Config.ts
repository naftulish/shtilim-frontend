class AppConfig {
  public apiUrl: string = process.env.REACT_APP_API_URL || "";
  //  public apiUrl:string = "https://shtilim.onrender.com/api/"
  public users: string = this.apiUrl + "users/";
  public students: string = this.apiUrl + "students/";
  public groups: string = this.apiUrl + "groups/";
  public plans: string = this.apiUrl + "plans/";
  public activities: string = this.apiUrl + "activities/";
  public register: string = this.apiUrl + "auth/register/";
  public login: string = this.apiUrl + "auth/login/";
  // public Add: string = this.apiUrl + "plans/";
}

const appConfig = new AppConfig();
export default appConfig;