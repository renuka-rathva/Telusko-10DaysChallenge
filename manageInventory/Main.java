package com.manageInventory;

import java.time.Year;
import java.util.List;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		ProductService service = new ProductService();
		
		service.addProduct(new Product("Type C", "Cable", "Black Drawer", 2024));
        service.addProduct(new Product("Mac Studio", "Computer", "White Table", 2025));
        service.addProduct(new Product("Focusrite Mixer", "Audio System", "White Table", 2025));
        service.addProduct(new Product("Asus Vivobook", "Laptop", "Brown Drawer", 2021));
        service.addProduct(new Product("Asus Rog", "Laptop", "Black Table", 2021));
        service.addProduct(new Product("Macbook pro", "Laptop", "Brown Drawer", 2022));
        service.addProduct(new Product("Wacom Pad", "Writing Pad", "Black Drawer", 2020));
        service.addProduct(new Product("Apple Keyboard", "Keyboard", "White Table", 2022));
        service.addProduct(new Product("Logitech Keyboard", "Keyboard", "Black Table", 2024));
        service.addProduct(new Product("Hdmi cable", "Cable", "Black Drawer", 2024));
        service.addProduct(new Product("Java Black Book", "Cable", "Shelf", 2024));
        service.addProduct(new Product("Logi Mouse", "Mouse", "Black Table", 2022));
        service.addProduct(new Product("Apple Mouse", "Mouse", "White Table", 2022));
        service.addProduct(new Product("Lenovo Mouse", "Mouse", "Black Drawer", 2022));
        service.addProduct(new Product("BlackBeast", "Computer", "White Table", 2020));
        
        
        
        //Get all products
        List<Product> AllProducts = service.getAllproducts();
        for(Product p:AllProducts) {
        	System.out.println(p);	
        }
        
        System.out.println("-----------------------------");
        
        //Get Product by name
        Product prod = service.getProductByName("Java Black Book");
        System.out.println(prod);	
	  
        System.out.println("-----------------------------");
        
        //Get Product by text
        List<Product> foundProd = service.searchProductbyText("Drawer");
        System.out.println(foundProd);
        System.out.println();
        System.out.println("---------------Get All Products by Place--------------\n");
        
        //Get All Products by Place
        List<Product> foundByPlace = service.getAllProductsByPlace("White Table");
        System.out.println(foundByPlace);
        
        System.out.println();
        System.out.println("------------Get Expired warranty products-----------------\n");
        
        //Get Expired warranty products
        int Currentyear = Year.now().getValue();
        List<Product> expiredProduct = service.getAllExpiredProds(Currentyear);
        System.out.println(expiredProduct);
        System.out.println();
     
        
        //Get products on white table by "STREAM API"
        List<Product> onWhiteTable =  service.getProductofWhite();
       // System.out.println(onWhiteTable);
        System.out.println("-------------Get products on white table by STREAM API----------------\n");
        onWhiteTable.stream().forEach(p-> System.out.println(p.getName()));
	}

}
