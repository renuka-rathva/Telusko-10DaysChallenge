package com.renuka.inventorymvc;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.google.common.hash.Hashing;
@RestController
@CrossOrigin(origins="*")
public class ProductController {
	@Autowired
	ProductService service;
	
	
	 
	@GetMapping("/products")
	public Page<Product> getAllProducts(@Param("keyword") String keyword,Pageable pageable){
	
		return service.getAllproducts(keyword,pageable);
	}
		
	 @PostMapping("/product")
	    public String addProduct(
	            @RequestParam(value = "id", required =false) Integer id,
	            @RequestParam("name") String name,
	            @RequestParam("type") String type,
	            @RequestParam("place") String place,
	            @RequestParam("warranty") int warranty,
	            @RequestParam("file")MultipartFile file) throws IOException{
	         service.addProduct(id,name,type,place,warranty,file);
	         return "Added";
	  }
	
	
	@GetMapping("/edit/{id}")
	public Product showEditProductPage(@PathVariable(name = "id") int id) {
	    Product product = service.get(id);
	    return product;
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteProduct(@PathVariable(name = "id") int id) {
	    service.delete(id);
	    return "ok";       
	}
	@PutMapping("/product/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable(name = "id") int id,  @RequestParam("name") String name,
            @RequestParam("type") String type,
            @RequestParam("place") String place,
            @RequestParam("warranty") int warranty,
            @RequestParam("file")MultipartFile file) throws IOException{
		  Product product=service.updateProduct(id,name,type,place,warranty,file);
        return ResponseEntity.ok(product);
    }
	
	 @PostMapping("/shorturl")
	public String generateShortUrl(@RequestBody String url) {
		 String encodedUrl = "";
			LocalDateTime time = LocalDateTime.now();
			encodedUrl = Hashing.murmur3_32_fixed().hashString(url.concat(time.toString()), StandardCharsets.UTF_8).toString();
			return encodedUrl;
	}
}
