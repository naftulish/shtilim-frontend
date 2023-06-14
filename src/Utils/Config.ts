<<<<<<< HEAD
class AppConfig {
  public apiUrl: string = process.env.REACT_APP_API_URL || "";
  //  public apiUrl:string = "https://shtilim.onrender.com/api/"
  public users: string = this.apiUrl + "users/";
  public students: string = this.apiUrl + "students/";
  public groups: string = this.apiUrl + "groups/";
  public plans: string = this.apiUrl + "plans/";
  public activities: string = this.apiUrl + "activities/";
=======
class AppConfig{
    products<T>(products: any) {
        throw new Error("Method not implemented.");
    }
    public apiUrl:string = process.env.REACT_APP_API_URL || "";
    public users:string = this.apiUrl + "users/";
    public students:string = this.apiUrl + "student/";
    public groups:string = this.apiUrl + "groups/";
    public plans:string = this.apiUrl + "plans/";
    public activities:string = this.apiUrl + "activities/";
>>>>>>> a0012ee44d92ab2748a7321db169205af0989e5b
}

const appConfig = new AppConfig();
export default appConfig;