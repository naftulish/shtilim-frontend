class AppConfig{
    products<T>(products: any) {
        throw new Error("Method not implemented.");
    }
    public apiUrl:string = process.env.REACT_APP_API_URL || "";
    public users:string = this.apiUrl + "users/";
    public students:string = this.apiUrl + "students/";
    public groups:string = this.apiUrl + "groups/";
    public plans:string = this.apiUrl + "plans/";
    public activities:string = this.apiUrl + "activities/";
}

const appConfig = new AppConfig();
export default appConfig;