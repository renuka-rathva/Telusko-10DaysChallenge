
import React, { useEffect, useState } from 'react';
import ProductService from "./ProductService";
import Pagination from '@mui/material/Pagination';
import AddProduct from './AddProduct';
import Navbar from './Navbar';
import UpdateProduct from './UpdateProduct';
import UrlShortner from './UrlShortner';
function App() {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchtxt, setSearchTxt] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [passId, setPassId] = useState("");
  const pageSizes = [4, 8, 12];
  const getRequestParams = (searchtxt, page, pageSize) => {
    let params = {};

    if (searchtxt) {
      params["keyword"] = searchtxt;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };
  var url =""
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = getRequestParams(searchtxt, page, pageSize);
        const response = await ProductService.getProducts(params);
        console.log(response)
        const { content, totalPages } = response.data;
      
        setProducts(content);
        setCount(totalPages);
       // setProducts(response.data.content);
    
      } catch (error) { 
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  },[page, pageSize,searchtxt]);


 

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

const deleteProductby = async (e,id)=>{
  e.preventDefault();
  try {
    
    ProductService.deleteProduct(id);
    const params = getRequestParams(searchtxt, page, pageSize);
    const response1 = await ProductService.getProducts(params);

     const { content, totalPages } = response1.data;

    setProducts(content);
    setCount(totalPages);
    setPage(1);

  } catch (error) { 
    console.log(error);
  }
  
}
const editProductByid = async (e,id)=>{
  e.preventDefault();
  setPassId(id);
}

  return (
   <>
   <Navbar setSearchTxt={setSearchTxt}/>
   <div className='container'>
   <table className="table">
          <thead>
            <tr>
            <th>Image</th>
              <th>Product Name</th>
              <th>Type</th>
              <th>Place</th>
              <th>Warrenty</th>
              <th>Actions</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {products.map((product) => (
                  <tr key={product.id}>
                     <td><img className='img-thumbnail' style={{"width":"100px"}} src={`data:image;base64,${product.imageData}`} alt="img" /></td>
                  
                  <td>{product.name}</td>
                  <td>{product.type}</td>
                  <td>{product.place} </td>
                  <td>{product.warranty} </td>
                  <td>
                    <a onClick={(e,id)=>editProductByid(e,product.id)}  data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRightUpdate" className="btn btn-sm btn-primary me-3">
                      Edit
                    </a>
                    <a onClick={(e,id)=>deleteProductby(e,product.id)}  className="btn btn-sm btn-danger">
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div className='d-flex align-items-center justify-content-between'>
          <div>
        {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select></div>
          <Pagination
            color="primary"
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
            variant="outlined"
            onChange={handlePageChange}
          />
        </div>
        <div>
        <AddProduct/>
        
        <UpdateProduct passId={passId}/>
<UrlShortner/>

        </div>
        </div>
      
   </>
  );
}

export default App;
