import React, { useEffect, useState } from "react";
import ProductService from "./ProductService";
const UrlShortner = () => {
    const[url, setUrl] = useState({id: 0,shorturl: '', originalurl: ''});

    const handleInput = (event) => {
        setUrl({...url,"originalurl": event.target.value});
    }

    const getShortUrlFromServer = (data) =>{
        setUrl({...url,"originalurl": data.originalurl});
        console.log(url.originalurl);
        ProductService.getShortUrlFromServer(data.originalurl).then(
            (response) => {
                console.log(response)
                setUrl({...url,"shorturl": response.data});

            },(error) => {
                console.log(error)

            }
        )
    }



    const handleButton = () =>{
        getShortUrlFromServer(url);
    }




  return (
    <>
    
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">URL Shortner</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
        Enter or Paste Url here.
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">URL:</label>
            <input type="text" className="form-control" id="recipient-name"  onChange={(e) => handleInput(e)}/>
          </div>
         
        </form>
        <div class="alert alert-secondary" role="alert">
        Your Shortened Urls
</div>
<div className="container overflow-auto rounded w-75">
                    
                    <span className="link-a"><a className="link-a" href={`http://localhost:8080/${url.shorturl}`}>{`http://localhost:8080/${url.shorturl}`}</a> </span> 
                </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleButton}>Send message</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default UrlShortner
