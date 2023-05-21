class AppConfig{
    public apiUrl:string = process.env.REACT_APP_API_URL || "";
    public users:string = this.apiUrl + "users/";
}

const appConfig = new AppConfig();
export default appConfig;