// import React from 'react';
// import logo from './images/logo.png';
// import Container from 'react-bootstrap/Container';
// import { Col, Nav, NavDropdown, Row, Navbar } from 'react-bootstrap';
// import { Link ,useLocation} from 'react-router-dom';
// import { PiShoppingCartSimpleFill } from "react-icons/pi";
// import { FaSearch } from "react-icons/fa";
// import { useState } from 'react';

// const Navbarsection = () => {
//   const [expanded, setExpanded] = useState(false);
//   const [search, setSearch] = useState(false);
//   const location = useLocation(); 
//   const getLinkClass = (path) => {
//     return location.pathname === path ? 'navlink-active' : 'navlink';
//   };
//   const handlenavclose = () => {
//     setExpanded(false);
//   };
//   const Search = () => {
//     setSearch(true);
//   };
//   const onClose = () => {
//     setSearch(false);
//   }
//   return (
//     <div className='header'>
//       <Navbar expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
//         <Container>
//           <Row className='mx-auto'>
//             <Col lg={3} xl={5}>
//               <Navbar.Brand>
//                 <Link to="/home">
//                   <img className='logo' src={logo} alt="Logo" />
//                 </Link>
//               </Navbar.Brand>
//             </Col>
//             <Col lg={9} xl={5} >
              
//             <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler"  aria-expanded={expanded}>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </Navbar.Toggle>
//               <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav style={{ padding: '15px 0', marginTop: '2px', textAlign: 'center' }}>
//                   <Nav.Item>
//                     <Nav.Link as={Link} onClick={handlenavclose} className={getLinkClass('/home')} to="/home">Home</Nav.Link>
//                   </Nav.Item>
//                   <NavDropdown className='pages' title={<span className='page text-dark text-uppercase'>Pages</span>}>
//                     <NavDropdown.Item as={Link} onClick={handlenavclose} className='page text-dark text-decoration-none' to="/about">About</NavDropdown.Item>
//                     <NavDropdown.Item as={Link} onClick={handlenavclose} className='page text-dark text-decoration-none' to="/testimonal">Testimonial</NavDropdown.Item>
//                   </NavDropdown>
//                   <Nav.Item>
//                     <Nav.Link as={Link} onClick={handlenavclose} className={getLinkClass('/products')} to="/products">Products</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link as={Link} onClick={handlenavclose} className={getLinkClass('/blog')} to="/blog">Blog</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link as={Link} onClick={handlenavclose} className={getLinkClass('/contact')} to='/contact'>Contact</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link as={Link} onClick={handlenavclose} className={getLinkClass('/cart')} to='/cart'><PiShoppingCartSimpleFill style={{ fontSize: "20px" }} /></Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link as={Link} onClick={Search}  className='search navlink' to='/home'><FaSearch /></Nav.Link>
//                   </Nav.Item>
//                 </Nav>
//               </Navbar.Collapse>
//             </Col>
//           </Row>
//         </Container>
//       </Navbar>
//       <>{search  && (
//         <>
//         <div className='search-box'>
//         <input type="text" className='input-search w-50 text-center me-2' />
//         <button onClick={onClose} className=' btn btn-outline-danger  mb-4 py-2'>X</button>
//         </div>
//         </>)
//       }
//       </>
//     </div>
//   );
// };

// export default Navbarsection;

import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import logo from './images/logo.png';
import Container from 'react-bootstrap/Container';
import { Col, Nav, NavDropdown, Row, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { useSelector} from 'react-redux';

const Navbarsection = () => {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
    const cartItems = useSelector((state) => state.cart.items);

  const location = useLocation();
  const getLinkClass = (path) => {
    return location.pathname === path ? 'navlink-active' : 'navlink';
  };
  const handlenavclose = () => {
    setExpanded(false);
  };
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const Search = () => {
    setSearch(true);
  };
  const onClose = () => {
    setSearch(false);
    setSearchInput("");
    setSearchResults([]);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get('/search-products', { params: { name: searchInput } });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for products:', error.message);
      setSearchResults([]);
    }
  };

  return (
    <div className='header'>
      <Navbar expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
        <Container>
          <Row className='mx-auto'>
            <Col lg={3} xl={5}>
              <Navbar.Brand>
                <Link to="/home">
                  <img className='logo' src={logo} alt="Logo" />
                </Link>
              </Navbar.Brand>
            </Col>
            <Col lg={9} xl={5}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" aria-expanded={expanded}>
                <span></span>
                <span></span>
                <span></span>
              </Navbar.Toggle>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{ padding: '15px 0', marginTop: '2px', textAlign: 'center' }}>
                  <Nav.Item>
                    <Nav.Link as={Link} onClick={handlenavclose} className={getLinkClass('/home')} to="/home">Home</Nav.Link>
                  </Nav.Item>
                  <NavDropdown className='pages' title={<span className='page text-dark text-uppercase'>Pages</span>}>
                    <NavDropdown.Item as={Link} onClick={handlenavclose} className='page text-dark text-decoration-none' to="/about">About</NavDropdown.Item>
                    <NavDropdown.Item as={Link} onClick={handlenavclose} className='page text-dark text-decoration-none' to="/testimonal">Testimonial</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Item>
                    <Nav.Link as={Link} onClick={handlenavclose} className={getLinkClass('/products')} to="/products">Products</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} onClick={handlenavclose} className={getLinkClass('/blog')} to="/blog">Blog</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} onClick={handlenavclose} className={getLinkClass('/contact')} to='/contact'>Contact</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
  <Nav.Link as={Link} onClick={handlenavclose} className={getLinkClass('/cart')} to='/cart'>
    <PiShoppingCartSimpleFill style={{ fontSize: "20px", position: "relative" }} />
    {cartItems.length > 0 && (
      <span
        style={{position: "absolute", top: "-5px",right: "-5px",backgroundColor: "red",color: "white",borderRadius: "50%",width: "20px",height: "20px", display: "flex",alignItems: "center", justifyContent: "center",
          fontSize: "12px"  }}
      >
        {cartItems.length}
      </span>
    )}
  </Nav.Link>
</Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} onClick={Search} className='search navlink' to='/home'><FaSearch /></Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
      {search && (
        <div className='search-box'>
          <input
            type="text"
            className='input-search w-50 text-center me-2'
            value={searchInput}
            onChange={handleSearchInput}
            placeholder="Search products..."
          />
          <button onClick={handleSearchSubmit} className='btn btn-outline-success mb-4 py-2'>Search</button>
          <button onClick={onClose} className='btn btn-outline-danger mb-4 ms-2 py-2'>X</button>
        </div>
      )}
      {searchResults.length > 0 && (
        <div className='search-results'>
          {searchResults.map(product => (
            <div key={product.id} className='search-result-item'>
              <h5>{product.name}</h5>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      )}
      {search && searchResults.length === 0 && (
        <div className='text-center mt-3'>
          <p>No results found</p>
        </div>
      )}
    </div>
  );
};

export default Navbarsection;