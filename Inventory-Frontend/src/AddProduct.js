import React, { useState } from "react";
import ProductService from "./ProductService";
const AddProduct = () => {
 
  const [product, setProduct] = useState({
    id: "",
    name: "",
    type: "",
    place: "",
    warranty: "",
    file:""
  });
  const reset = (e) => {
    e.preventDefault();
    setProduct({
      id: "",
      name: "",
      type: "",
      place: "",
      warranty: "",
      file:""
    });
  };
  const uploadFileHandler = (event) => {
    console.log(event.target.files[0]);
    setProduct({ ...product, file: event.target.files[0] });
  
   };
  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };
  const saveProduct = (e) => {
 
    let formData = new FormData();
    formData.append("id",product.id);
    formData.append("name",product.name);
    formData.append("type",product.type);
    formData.append("place",product.place);
    formData.append("warranty",product.warranty);
    formData.append("file", product.file);
    console.log(formData);
    console.log(product.name);

    ProductService.saveProduct(formData)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
     
   
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Add New Product</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={product.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Type</label>
            <input
              type="text"
              className="form-control"
              name="type"
              value={product.type}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product place</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              name="place"
              value={product.place}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product warranty</label>
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              name="warranty"
              value={product.warranty}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Image</label>
            <input type="file"  multiple onChange={uploadFileHandler}/>
          </div>
        
     
          <button
            onClick={saveProduct}
            data-bs-dismiss="offcanvas"
            type="button"
            className="btn btn-primary me-2"
          >
            Add
          </button>
          <button onClick={reset} type="button" className="btn btn-danger">
            Clear
          </button>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
