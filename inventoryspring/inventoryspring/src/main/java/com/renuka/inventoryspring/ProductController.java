package com.renuka.inventoryspring;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
	@Autowired
	ProductService service;
	
	@GetMapping("/products")
	public List<Product> getAllProducts(){
			
		return service.getAllproducts();
	}
	
}
