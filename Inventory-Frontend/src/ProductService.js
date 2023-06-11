import axios from "axios";
const PRODUCT_API_BASE_URL = "http://localhost:8080/";

class ProductService{
    getProducts(params){
      return  axios.get(PRODUCT_API_BASE_URL+"products",{ params });
    }
    deleteProduct(id){
        return  axios.delete(PRODUCT_API_BASE_URL+"delete/"+id);
    }
    editProduct(id){
        return axios.get(PRODUCT_API_BASE_URL+"edit/"+id)
    }
    saveProduct(product){
        return axios.post(PRODUCT_API_BASE_URL+"product",product)
    }
    updateProduct(product,id){
        return axios.put(PRODUCT_API_BASE_URL+"product/"+id,product)
     }
     getShortUrlFromServer(originalurl){
        return axios.post(PRODUCT_API_BASE_URL+"shorturl",originalurl)
     }
}
export default new ProductService();