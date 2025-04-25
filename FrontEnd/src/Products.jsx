import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from './CartSlice';
import p1 from './images/p1.png';
import p2 from './images/p2.png';
import p3 from './images/p3.png';
import p4 from './images/p4.png';
import p5 from './images/p5.png';
import p6 from './images/p6.png';
import p7 from './images/p7.png';
import p8 from './images/p8.png';
import p9 from './images/p9.png';
import p10 from './images/p10.png';
import p11 from './images/p11.png';
import p12 from './images/p12.png';

const Products = () => {
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [viewProduct, setViewProduct] = useState(false); 
  const dispatch = useDispatch();

  const Products = [
    { id: 1, name: "Men's Shirt", price: 75, img: p1 },
    { id: 2, name: "Men's Shirt", price: 80, img: p2 },
    { id: 3, name: "Women's Dress", price: 68, img: p3 },
    { id: 4, name: "Women's Dress", price: 70, img: p4 },
    { id: 5, name: "Women's Dress", price: 75, img: p5 },
    { id: 6, name: "Women's Dress", price: 58, img: p6 },
    { id: 7, name: "Women's Dress", price: 80, img: p7 },
    { id: 8, name: "Men's Shirt", price: 65, img: p8 },
    { id: 9, name: "Men's Shirt", price: 65, img: p9 },
    { id: 10, name: "Men's Shirt", price: 65, img: p10 },
    { id: 11, name: "Men's Shirt", price: 65, img: p11 },
    { id: 12, name: "Women's Dress", price: 65, img: p12 },
  ];

  const handleViewMore = () => {
    setViewProduct(true);
    setVisibleProducts(Products.length); 
  };

  const handleClose = () => {
    setViewProduct(false); 
    setVisibleProducts(6); 
  };

  return (
    <div className="common">
      <div className="bg">
        <h3 style={{ fontSize: '42px', fontWeight: '800' }}>Product Grid</h3>
      </div>
      <div className="product-section">
        <h2 className="product-text text-center">Our <span>products</span></h2>
        <Container>
          <div className="product-row">
            <Row>
              {Products.slice(0, visibleProducts).map((product) => (
                <Col lg={4} md={4} key={product.id}>
                  <div className="product-box">
                    <div className="product-container">
                      <div className="product-option">
                        <Button
                          onClick={() => dispatch(addToCart(product))}
                          className="option1"
                        >
                          Add To Cart
                        </Button>
                        <Button className="option2">Buy Now</Button>
                      </div>
                    </div>
                    <div className="product-img">
                      <img src={product.img} alt={product.name} />
                    </div>
                    <div className="product-details">
                      <h5>{product.name}</h5>
                      <h6>${product.price}</h6>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          {!viewProduct && visibleProducts < Products.length && (
            <div className="text-center mt-5">
              <Button className="shop-now" onClick={handleViewMore}>View All Products</Button>
            </div>
          )}
          {viewProduct && (
            <div className="text-center mt-5">
              <Button className="shop-now" onClick={handleClose}>Close</Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Products;

