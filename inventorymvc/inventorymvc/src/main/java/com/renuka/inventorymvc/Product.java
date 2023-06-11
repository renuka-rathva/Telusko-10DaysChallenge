package com.renuka.inventorymvc;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;


@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private String type;
    private String place;
    private int warranty;
    @Lob
    @Column(name = "imagedata")
    private byte[] imageData;
    
    
    public Product() {
    }

    public Product(String name, String type, String place, int warranty) {
    	
        this.name = name;
        this.type = type;
        this.place = place;
        this.warranty = warranty;
    }
   
    public Product(Integer id,String name, String type, String place, int warranty) {
    	this.id=id;
        this.name = name;
        this.type = type;
        this.place = place;
        this.warranty = warranty;
    }
    
    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getPlace() {
        return place;
    }
    public void setPlace(String place) {
        this.place = place;
    }
    public int getWarranty() {
        return warranty;
    }
    public void setWarranty(int warranty) {
        this.warranty = warranty;
    }
    public byte[] getImageData() {
		return imageData;
	}
	public void setImageData(byte[] imageData) {
		this.imageData = imageData;
	}

    @Override
    public String toString() {
        return "Product{" +
        		"id='" + id + '\'' +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", place='" + place + '\'' +
                ", warranty=" + warranty +
                '}';
    }

}
