package com.renuka.inventoryspring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;
    public void addProduct(Product product) {
        repo.save(product);
    }

    public List<Product> getAllproducts() {
        return repo.findAll();
    }

    public Product getProductByName(String prodName) {
        List<Product> products=repo.findAll();
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
}
