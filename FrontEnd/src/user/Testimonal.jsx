import React from 'react'
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import client from './images/client.jpg';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineTwitter } from "react-icons/ai";
import { LiaLinkedinIn } from "react-icons/lia";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoPinterest } from "react-icons/io";
const Testimonal = () => {
  const onHome = () => {
    window.scrollTo({
      top:0,
      behavior:'instant'
    });
  }
  return (
    <div className="common">
    <div className='bg'>
      <h3 style={{fontSize:'42px',fontWeight:'800'}}>Testimonal</h3>
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
                         <Link to='/home'  onClick={onHome} className='text-decoration-none text-light'> <h4 style={{fontSize:'32px'}}>Famms</h4></Link>
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

export default Testimonal;
