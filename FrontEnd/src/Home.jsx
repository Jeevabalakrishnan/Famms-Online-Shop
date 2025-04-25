import React from 'react'
import { Container, Row, Col, Carousel, Form } from 'react-bootstrap';
import slidebg from './images/slider-bg.jpg';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { ReactComponent as TruckIcon } from './assets/image/truck.svg';
import { ReactComponent as FreeIcon } from './assets/image/free.svg';
import { ReactComponent as QualityIcon } from './assets/image/quality.svg';
import arrivalbg from './images/arrival-bg.jpg';
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
import client from './images/client.jpg';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import logo from './images/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from './CartSlice';

const Home = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const Products = [
    {id:2,name:"Men's Shirt",price:80,img:p2},
    {id:3,name:"Women's Dress",price:68,img:p3},
    {id:4,name:"Women's Dress",price:70,img:p4},
    {id:5,name:"Women's Dress",price:75,img:p5},
    {id:6,name:"Women's Dress",price:58,img:p6},
    {id:7,name:"Women's Dress",price:80,img:p7},
    {id:8,name:"Men's Shirt",price:65,img:p8},
    {id:9,name:"Men's Shirt",price:65,img:p9},
    {id:10,name:"Men's Shirt",price:65,img:p10},
    {id:11,name:"Men's Shirt",price:65,img:p11},
    {id:12,name:"Women's Dress",price:65,img:p12},
  ]

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const handleScrollToTop = (smoothScroll = false) => {
    window.scrollTo({
      top: 0,
      behavior: smoothScroll ? 'smooth':'instant',
    });
  };
  const onShop = () => {
    window.scrollTo({
      top: 1820, 
      behavior: 'smooth', 
    });
  };
const [viewDress,setviewDress] = useState(false);

const ondress = () => {
  window.scrollTo({
    top:1830,
    behavior:'smooth'
  })
  setviewDress(true);
  
};
const onClose = () => {
  window.scrollTo({
    top:1820,
    behavior:'smooth'
  })
  setviewDress(false);
};

  return (
    <div className="common">
      <div className='slider-section' >
        <div className="slidebg">
          <img src={slidebg} alt="sliderbg" className='slider-image' />
        </div>
        <Container fluid>
        <Row >
            <Col lg={12}  xl={12}>
              <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} controls={false} >
                <Carousel.Item>
                  <div className="detail-box">
                    <h1><span>Sale 20% Off</span> <br />On Everything</h1>
                    <p>Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.</p>
                    <Button className="shop-now" onClick={onShop}>Shop Now</Button>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="detail-box">
                    <h1><span>New Year 50% Off</span> <br />Women's Dress</h1>
                    <p>Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.</p>
                    <Button className="shop-now" onClick={onShop}>Shop Now</Button>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="detail-box">
                    <h1><span>Buy 1 Get 1 Off</span> <br />Men's Shirt</h1>
                    <p>Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.</p>
                    <Button className="shop-now" onClick={onShop}>Shop Now</Button>
                  </div>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
        <div className="custom-indicators">
          <ol className="carousel-indicators ">
            <li className={index === 0 ? "active" : ""} onClick={() => setIndex(0)}></li>
            <li className={index === 1 ? "active" : ""} onClick={() => setIndex(1)}></li>
            <li className={index === 2 ? "active" : ""} onClick={() => setIndex(2)}></li>
          </ol>
        </div>
      </div>
      <div className="whyshop-section">
        <h2 className='whyshop-text text-center '>Why Shop With Us </h2>
        <Container >
        <div className="whyshop-container ">
          <Row >     
            <Col lg={4} md={4} >
              <div className="whyshop-box">
                <div className="whyshop-img" style={{ marginBottom: '15px' }}>
                  <TruckIcon style={{ width: '55px', fill: 'white', height: 'auto' }} />
                </div>
                <h5>Fast Delivery</h5>
                <p>variations of passages of Lorem Ipsum available</p>
              </div>
            </Col>
            <Col lg={4}  md={4}>
              <div className="whyshop-box">
                <div className="whyshop-img" style={{ marginBottom: '15px' }}>
                  <FreeIcon style={{ width: '55px', fill: 'white', height: 'auto' }} />
                </div>
                <h5>Free Shiping</h5>
                <p>variations of passages of Lorem Ipsum available</p>
              </div>
            </Col>
            <Col lg={4}  md={4}>
              <div className="whyshop-box">
                <div className="whyshop-img" style={{ marginBottom: '15px' }}>
                  <QualityIcon style={{ width: '55px', fill: 'white', height: 'auto' }} />
                </div>
                <h5>Best Quality</h5>
                <p>variations of passages of Lorem Ipsum available</p>
              </div>
            </Col>    
          </Row>
          </div>
        </Container>
      </div>
      <div className="arrival-section">
        <Container>
          <Row >
            <Col lg={6} md={6}  className='mx-auto'>
              <div className="arrival-img">
                <img src={arrivalbg} alt="arrivalbg" />
              </div>
            </Col>
            <Col lg={6} md={6} >
              <div className="heading-arrival" >
                <h2>#NewArrivals</h2>
                <p style={{ marginTop: "20px", marginBottom: "30px" }}>
                  Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic? Tenetur commodi, nisi rem vel, ea eaque ab ipsa, autem similique ex unde!
                </p>
                <Button onClick={onShop} className="shop-now">Shop Now</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
<>{!viewDress && (
<div className="product-section">
          <h2 className='product-text text-center '>Our <span> products</span> </h2>
          <Container>
            <div className="product-row">
              <Row >
                <Col lg={4} md={4} sm={6} xs={12}>
                  <div className="product-box ">
                    <div className="product-container">
                      <div className="product-option">
                        <Button onClick={ondress} className='option1'>Men's Shirt</Button>
                        <Button className='option2'>Buy Now</Button>
                      </div>
                    </div>
                    <div className="product-img">
                      <img src={p1} alt="product1" />
                    </div>
                    <div className="product-details">
                      <h5>Men's Shirt</h5>
                      <h6>$75</h6>
                    </div>
                  </div>
                </Col>
            
                {Products.map((product) => (
                   <Col lg={4} md={4}>
                  <div key={product.id} className="product-box">
                    <div className="product-container">
                      <div className="product-option">
                        <Button onClick={() => dispatch(addToCart(product))} className='option1'>Add To Card</Button>
                        <Button className='option2'>Buy Now</Button>
                      </div>
                    </div>
                    <div className="product-img">
                      <img src={product.img} alt="product2" />
                    </div>
                    <div className="product-details">
                      <h5>{product.name}</h5>
                      <h6>${product.price}</h6>
                    </div>
                  </div>
                  </Col> ))}  
              <div className="product-btn text-center mt-5">
                <Button href='/products' className="shop-now">View All products</Button>
              </div>
            </Row>
          </div>
        </Container>
      </div>)}
</>
      <>{viewDress && (
      <div className="product-section">
          <h2 className='product-text text-center '>Men's<span> Shirt</span> </h2>
          <Container>
            <div className="product-row">
              <Row >
                <Col lg={4} md={4}>
                  <div className="product-box ">
                    <div className="product-container">
                      <div className="product-option">
                        <Button className='option1'>Add To Card</Button>
                        <Button className='option2'>Buy Now</Button>
                      </div>
                    </div>
                    <div className="product-img">
                      <img src={p1} alt="product1" />
                    </div>
                    <div className="product-details">
                      <h5>Men's Shirt</h5>
                      <h6> $75</h6>
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={4}>
                  <div className="product-box">
                    <div className="product-container">
                      <div className="product-option">
                        <Button className='option1'>Add To Card</Button>
                        <Button className='option2'>Buy Now</Button>
                      </div>
                    </div>
                    <div className="product-img">
                      <img src={p2} alt="product2" />
                    </div>
                    <div className="product-details">
                      <h5>Men's Shirt</h5>
                      <h6> $80</h6>
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={4}>
                  <div className="product-box">
                    <div className="product-container">
                      <div className="product-option">
                      <Button className='option1'>Add To Card</Button>
                        <Button className='option2'>Buy Now</Button>
                      </div>
                    </div>
                    <div className="product-img">
                      <img src={p8} alt="product8" />
                    </div>
                    <div className="product-details">
                      <h5>Men's Shirt</h5>
                      <h6> $65</h6>
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={4}>
                  <div className="product-box">
                    <div className="product-container">
                      <div className="product-option">
                      <Button className='option1'>Add To Card</Button>
                        <Button className='option2'>Buy Now</Button>
                      </div>
                    </div>
                    <div className="product-img">
                      <img src={p9} alt="product9" />
                    </div>
                    <div className="product-details">
                      <h5>Men's Shirt</h5>
                    <h6> $65</h6>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4}>
                <div className="product-box">
                  <div className="product-container">
                    <div className="product-option">
                    <Button className='option1'>Add To Card</Button>
                      <Button className='option2'>Buy Now</Button>
                    </div>
                  </div>
                  <div className="product-img">
                    <img src={p10} alt="product10" />
                  </div>
                  <div className="product-details">
                    <h5>Men's Shirt</h5>
                    <h6> $65</h6>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4}>
                <div className="product-box">
                  <div className="product-container">
                    <div className="product-option">
                    <Button className='option1'>Add To Card</Button>
                      <Button className='option2'>Buy Now</Button>
                    </div>
                  </div>
                  <div className="product-img">
                    <img src={p11} alt="product11" />
                  </div>
                  <div className="product-details">
                    <h5>Men's Shirt</h5>
                    <h6> $65</h6>
                  </div>
                </div>
              </Col>
              <div className="product-btn text-center mt-5">
                <Button onClick={onClose} className="shop-now">Close</Button>
              </div>
            </Row>
          </div>
        </Container>
      </div>)}
      </>
      <div className="subscribe-section text-center">
        <Container fluid>
          <div className="subscribe-box">
            <Row>
              <Col className='m-auto' >
                <div className="subscribe-details">
                  <div className="subscribe-text">
                    <h3 style={{textAlign:'center'}}>Subscribe To Get Discount Offers</h3>
                  </div>
                  <p style={{ fontSize: '1.1rem' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                  <Form>
                    <input className='subscribe-input' type="text" placeholder="Enter your email" />
                  </Form>
                  <Button className='subscribe-btn'>Subscribe</Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div className="client-section">
        <h2 className='client-text text-center '> Customer's Testimonial </h2>
        <Container>
          <Row className='mx-auto justify-content-center'>
            <Col lg={9} >
              <Carousel indicators={false} nextIcon={<FaLongArrowAltRight />}
                prevIcon={<FaLongArrowAltLeft />}>
                <Carousel.Item>
                  <div className="client-box">
                    <div className="client-img text-center">
                      <img src={client} alt="" />
                    </div>
                    <div className="client-details mt-3 ">
                      <h5>Anna Trevor </h5>
                      <h6>Customer</h6>
                      <p > Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.</p>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="client-box">
                    <div className="client-img text-center">
                      <img src={client} alt="" />
                    </div>
                    <div className="client-details mt-3 ">
                      <h5>Anna Trevor </h5>
                      <h6>Customer</h6>
                      <p > Dignissimos reprehenderit repellendus nobis error quibusdam? Atque animi sint unde quis reprehenderit, et, perspiciatis, debitis totam est deserunt eius officiis ipsum ducimus ad labore modi voluptatibus accusantium sapiente nam! Quaerat.</p>
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
 <div className="footer-section">
  <Container>
    <div className="footer-box ">
    <Row >
      <Col lg={4} md={4}>
      <div className="footer-logo">
        <img src={logo} alt=""  width={210}/>
      </div>
      <div className="address">
        <p> <span className='fw-bold'>ADDRESS:</span> 28 White tower, Street Name New York City, USA</p>
        <p> <span className='fw-bold'>TELEPHONE:</span>+91 987 654 3210</p>
        <p> <span className='fw-bold'>EMAIL:</span> yourmain@gmail.com</p>
      </div>
      </Col>
      <Col md={2} className='footer-menu text-left'>
      <h3 className='mb-4'>Menu</h3>
      <div className="menu-links">
       <Link className='footer-link'></Link>
       <Link className='footer-link' to='/' onClick={() => handleScrollToTop(true)}>Home</Link>
       <Link  className='footer-link' onClick={() => handleScrollToTop(false)} to="/about">About</Link>
       <Link  className='footer-link' onClick={() => handleScrollToTop(false)} to="/home">Service</Link>
       <Link  className='footer-link' onClick={() => handleScrollToTop(false)} to="/testimonal">Testimonal</Link>
       <Link  className='footer-link' onClick={() => handleScrollToTop(false)} to="/blog">Blog</Link>
       <Link  className='footer-link' onClick={() => handleScrollToTop(false)} to="/contact">Contact</Link>
       </div>
      </Col>
      <Col lg={2} md={2}>
      <h3 className='mb-4 text-left'>Account</h3>
      <div className="menu-links ">
       <Link  className='footer-link' to="/home">Account</Link>
       <Link  className='footer-link' to="/home">Checkout</Link>
       <Link  className='footer-link' to="/home">Login</Link>
       <Link  className='footer-link' to="/home">Register</Link>
       <Link  className='footer-link' to="/home">Shopping</Link>
       <Link  className='footer-link' to="/home">Widget</Link>
       </div>
      </Col>
      <Col lg={4} md={4} className='newsletter-box'>
      <h3 className='mb-4 text-left'>Newsletter</h3>
      <p >
      Subscribe by our newsletter and get update protidin.</p>
      <input className='mail-input ' type="email" name="" id="" placeholder='Enter Your Mail' />
     <input type="submit" value="subscribe" className='btn-subscribe' />
      </Col>
    </Row>
    </div>
  </Container>
 </div>
    </div>
  )
}

export default Home;