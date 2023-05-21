package com.manageInventory;
import java.util.ArrayList;
import java.util.List;
public class ProductService {
	
	List<Product> products = new ArrayList<>();
	public void addProduct(Product p) {
		products.add(p);
	}
	public List<Product> getAllproducts() {
		
		return products;
	}
	public Product getProductByName(String prodName) {
	  for(Product p:products) {
		  if(p.getName().equalsIgnoreCase(prodName)) {
			  return p;
		  }
	  }
		return null;
	}
	public List<Product> searchProductbyText(String searchText) {
		String str = searchText.toLowerCase();
        List<Product> prods = new ArrayList<>();

        for(Product p : products){
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
		for(Product p:products) {
			if(p.getPlace().equalsIgnoreCase(searchPlace)) {
				prodsByPlace.add(p); 
			}
		}
		return prodsByPlace;
	}
	public List<Product> getAllExpiredProds(int currentyear) {
		List<Product> prodsByWarranty = new ArrayList<>();
		for(Product p:products) {
			if(p.getWarranty()<=currentyear) {
				prodsByWarranty.add(p); 
			}
		}
		return prodsByWarranty;
	}
	public List<Product> getProductofWhite() {
		return products.stream().filter(p -> p.getPlace().equals("White Table")).toList();
	}

	
	
}
