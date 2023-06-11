package com.renuka.inventorymvc;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
	
	@Query("SELECT p FROM Product p where p.name like ?1" 
	           + " or p.type like ?1 or p.place like ?1")
	public Page<Product> search(String keyword,Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.name = ?1")
	public Product findByName(String name);
}
