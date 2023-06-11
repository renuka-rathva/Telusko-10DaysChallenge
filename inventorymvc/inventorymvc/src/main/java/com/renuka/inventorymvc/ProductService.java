package com.renuka.inventorymvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.web.multipart.MultipartFile;
@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;
    
    public Page<Product> getAllproducts(String keyword, Pageable pageable) {
    	 if (keyword != null) {
    		 System.out.println(repo.search(keyword,pageable));
             return (Page<Product>) repo.search(keyword,pageable);
         }
         return repo.findAll(pageable);
       
    }
    
    public Product get(int id){
    	Optional<Product> optional = repo.findById(id);
    	Product prdt = null;
    	if(optional.isPresent()) {
    		prdt = optional.get();
    	}else {
    		throw new RuntimeException("Product not found for id "+id);
    	}
    	
        return prdt;
    }
     
    public void delete(int id) {
        repo.deleteById(id);
    }
    

    public Product getProductByName(String name) {
    	
//        List<Product> products=repo.findAll();
//        System.out.println(products);
//        for(Product p:products) {
//            if(p.getName().equalsIgnoreCase(prodName)) {
//                return p;
//            }
//        }
//        return null;
    	
    	return repo.findByName(name);
    }

    public List<Product> searchProductbyText(String searchText) {
        String str = searchText.toLowerCase();
        List<Product> prods = new ArrayList<>();

        for(Product p : repo.findAll()){
            String name = p.getName().toLowerCase();
            String type = p.getType().toLowerCase();
            String place = p.getPlace().toLowerCase();
            if(name.contains(str) || type.contains(str) || place.contains(str))
                prods.add(p);
        }
        return prods;
    }
  
    public List<Product> getAllProductsByPlace(String searchPlace) {
        List<Product> prodsByPlace = new ArrayList<>();
        for(Product p:repo.findAll()) {
            if(p.getPlace().equalsIgnoreCase(searchPlace)) {
                prodsByPlace.add(p);
            }
        }
        return prodsByPlace;
    }
   
    public List<Product> getAllExpiredProds(int currentyear) {
        List<Product> prodsByWarranty = new ArrayList<>();
        for(Product p:repo.findAll()) {
            if(p.getWarranty()<=currentyear) {
                prodsByWarranty.add(p);
            }
        }
        return prodsByWarranty;
    }
    
    public List<Product> getProductofWhite() {
        return repo.findAll().stream().filter(p -> p.getPlace().equals("White Table")).toList();
    }

	public Product updateProduct(Integer id, String name, String type, String place, int warranty, MultipartFile file) throws IOException {
		Product productEntity = repo.findById(id).get();
		productEntity.setName(name);
		productEntity.setType(type);
		productEntity.setPlace(place);
		productEntity.setWarranty(warranty);
		productEntity.setImageData(file.getBytes());
	        repo.save(productEntity);
	        return productEntity;
	}

	public void addProduct(Integer id, String name, String type, String place, int warranty, MultipartFile file) throws IOException {
		Product product = new Product();
		product.setName(name);
    	product.setType(type);
		product.setPlace(place);
		product.setWarranty(warranty);
		product.setImageData(file.getBytes());
    	//product.setImageData(ImageUtil.compressImage(file.getBytes()));
        repo.save(product);
	}
}
