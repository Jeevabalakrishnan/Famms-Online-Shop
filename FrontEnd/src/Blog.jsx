import React from 'react'
import { ReactComponent as TruckIcon } from './assets/image/truck.svg';
import { ReactComponent as FreeIcon } from './assets/image/free.svg';
import { ReactComponent as QualityIcon } from './assets/image/quality.svg';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineTwitter } from "react-icons/ai";
import { LiaLinkedinIn } from "react-icons/lia";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoPinterest } from "react-icons/io";

const Blog = () => {
  const onHome = () => {
    window.scrollTo({
      top:0,
      behavior:'instant'
    });
  }
  return (
    <div className="common">
      <div className='bg'>
        <h3 style={{ fontSize: '42px', fontWeight: '800' }}>Blog List</h3>
      </div>
            <div className="whyshop-section">
      
              <h2 className='whyshop-text text-center '>Why Shop With Us </h2>
              <Container >
              <div className="whyshop-container ">
                <Row >     
                  <Col lg={4} >
                    <div className="whyshop-box">
                      <div className="whyshop-img" style={{ marginBottom: '15px' }}>
                        <TruckIcon style={{ width: '55px', fill: 'white', height: 'auto' }} />
                      </div>
                      <h5>Fast Delivery</h5>
                      <p>variations of passages of Lorem Ipsum available</p>
                    </div>
                  </Col>
                  <Col lg={4} >
                    <div className="whyshop-box">
                      <div className="whyshop-img" style={{ marginBottom: '15px' }}>
                        <FreeIcon style={{ width: '55px', fill: 'white', height: 'auto' }} />
                      </div>
                      <h5>Free Shiping</h5>
                      <p>variations of passages of Lorem Ipsum available</p>
                    </div>
                  </Col>
                  <Col lg={4} >
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
      <div className="about-footer">
        <Container>
          <div className="footer-box">
            <Row>
              <Col lg={4}>
                <div className="footer-contact">
                  <h4>Reach at..</h4>
                  <div className="menu-links">
                    <Link className='about-links text-light text-decoration-none my-2'><FaMapMarkerAlt className='me-1 mb-1' /><span>Location</span></Link>
                    <Link className='about-links text-light text-decoration-none my-2'><FaPhoneAlt className='me-2 mb-1' /><span>Call +01 1234567890</span></Link>
                    <Link className='about-links text-light text-decoration-none my-2'><FaEnvelope className='me-2 mb-1' /><span>demo@gmail.com</span></Link>
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <div className="footer-contact" style={{marginBottom:'40px'}}>
                  <Link to='/home' onClick={onHome} className='text-decoration-none text-light'> <h4 style={{fontSize:'32px'}}>Famms</h4></Link>
                  <p>Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with</p>
                  <div className="footer-social" style={{ marginTop: '25px', marginBottom: '10px' }}>
                    <GrFacebookOption className='social-links' />
                    <AiOutlineTwitter className='social-links'/>
                    <LiaLinkedinIn className='social-links' />
                    <IoLogoInstagram className='social-links' />
                    <IoLogoPinterest className='social-links' />
                  </div>
                </div>
              </Col>
              <Col lg={4}>
              <div className="map" style={{height:'100%',padding:'70px'}}></div></Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Blog;