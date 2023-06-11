import React, { useEffect, useState,useRef  } from 'react';
import ProductService from "./ProductService";

const UpdateProduct = ({passId}) => {
  console.log(passId);
    const [product, setProduct] = useState({
        id: "",
        name: "",
        type:"",
        place:"",
        warranty:"",
      });
      const [file, setFile] = useState();
      const aRef = useRef();
      useEffect(() => {
         async function editProductBy(){
          try {
            const response = await  ProductService.editProduct(passId);
            console.log(response.data);
            setProduct(response.data);
          } catch (error) { 
            console.log(error);
            
          }
        }
        editProductBy();
      },[passId]);
      const reset = (e) => {
        e.preventDefault();
        async function editProductBy(){
          try {
            const response = await  ProductService.editProduct(passId);
            console.log(response.data);
            setProduct(response.data);
          } catch (error) { 
            console.log(error);
            
          }
        }
        editProductBy();
        setFile(null);
        aRef.current.value = null;
      };
      const uploadFileHandler = (event) => {
       // console.log(event.target.files[0]);
        var reader = new FileReader();
        let file = event.target.files[0];
        reader.onload = function () {
          var arrayBuffer = this.result;
         // Download(arrayBuffer, file.type);
        }
        reader.readAsArrayBuffer(file);
        //setProduct({ ...product, file: event.target.files[0] });
        setProduct({ ...product, file: event.target.files[0] });
        setFile(URL.createObjectURL(event.target.files[0]));
       };
       function Download(arrayBuffer, type) {
        var blob = new Blob([arrayBuffer], { type: type });
        var url = URL.createObjectURL(blob);
        window.open(url);
      }
      const handleChange = (e) => {
        const value = e.target.value;
        setProduct({ ...product, [e.target.name]: value });
      };

      const UpdateProduct = () => {
        //e.preventDefault();
        let formData = new FormData();
    formData.append("id",product.id);
    formData.append("name",product.name);
    formData.append("type",product.type);
    formData.append("place",product.place);
    formData.append("warranty",product.warranty);
    formData.append("file", product.file);
        ProductService.updateProduct(formData,product.id)
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
        id="offcanvasRightUpdate"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Update Product</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={reset}
          ></button>
        </div>
        <div className="offcanvas-body">
      
        <img className='img-thumbnail' style={{"width":"100px"}} src={`data:image;base64,${product.imageData}`} alt="img" />
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
            <input ref={aRef} type="file"  multiple onChange={uploadFileHandler}/>
            <img className='img-thumbnail' style={{"width":"100px"}} src={file} />
          </div>
         
          <button
            onClick={UpdateProduct}
            data-bs-dismiss="offcanvas"
            type="submit"
            className="btn btn-primary me-2"
          >
            Update
          </button>
          <button onClick={reset} type="submit" className="btn btn-danger">
            Cancel
          </button>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct
