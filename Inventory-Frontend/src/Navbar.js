
import React, {useState } from 'react';

const Navbar = ({setSearchTxt}) => {
     const [inputValue, setInputValue] = useState('');
     const handleClick = event => {
        console.log('handleClick ran');
        event.preventDefault(); // 👈️ prevent page refresh
        setSearchTxt(inputValue)
      };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" style={{"background-color": "#e3f2fd"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Inventory</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"   data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight">
          <a className="nav-link active" aria-current="page" href="#">Add Product</a>
        </li>
        <li className="nav-item d-none"  >
          <a className="nav-link active" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#">URL Shortner</a>
        </li>
      
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search"  value={inputValue}
          onChange={event => setInputValue(event.target.value)}/>
        <button className="btn btn-outline-secondary" type="button" onClick={handleClick}>Search</button>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar




