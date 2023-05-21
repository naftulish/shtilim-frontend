import axios from "axios";
import IProductModel from "../Models/IProductModel";
import appConfig from "../Utils/Config";

class ProductsService{

    // 01
    // async getOneProduct():Promise<IProductModel[]>{
        // פונקציה לקבלת מוצר יחיד
    // }

    // async getAllProducts():Promise<IProductModel[]>{
    //     let response = await axios.get<IProductModel[]>( appConfig.products );
    //     return response.data;
    // }

    // async addProduct( product:IProductModel ):Promise<IProductModel>{
    //     let response = await axios.post( appConfig.products, product );
    //     return response.data;
    // }
    
    // 04
    // async updateProduct( product:IProductModel ):Promise<IProductModel>{
        // הוספת פונקציה לעדכון
    // }

    // הוספת פונקציה למחיקת מוצר


}
const productsService = new ProductsService();
export default productsService;




