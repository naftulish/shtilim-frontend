import axios from "axios";
import appConfig from "../Utils/Config";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

class AuthService{
    public firebaseConfig = {
        apiKey: "AIzaSyAZ5XmlNcjSF04eskSH6a9fQjCTJr1wulM",
        authDomain: "shtilim-44f7a.firebaseapp.com",
        projectId: "shtilim-44f7a",
        storageBucket: "shtilim-44f7a.appspot.com",
        messagingSenderId: "448817172077",
      };
      
      public app = initializeApp(this.firebaseConfig);

      
    public auth = getAuth(this.app)  
     
      

    

}



const authService = new AuthService();
export default authService;
