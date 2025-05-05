import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import arrivalbg from './images/arrival-bg.jpg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineTwitter } from "react-icons/ai";
import { LiaLinkedinIn } from "react-icons/lia";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoPinterest } from "react-icons/io";
import { useForm } from 'react-hook-form';

const Contact = () => {
  const {register,
    handleSubmit,
    formState: {errors}} = useForm();
    const onSubmit = async (data) => {
      try {
          console.log("Submitted data:", data); 
  
          const response = await fetch("http://localhost:4000/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" }, 
              body: JSON.stringify(data), 
          });
  
          if (response.ok) {
              alert("Data saved successfully!");
              document.querySelector("form").reset();
          }if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Unknown error");
        }
      } catch (error) {
          console.error("Network Error:", error); 
          alert(`An unexpected error occurred: ${error.message}`);
      }
  };
  const onHome = () => {
    window.scrollTo({
      top:0,
      behavior:'instant'
    });
  }
  return (
    <div className="commom">
    <div className='bg'>
      <h3 style={{fontSize:'42px',fontWeight:'800'}}>Contact us</h3>
    </div>
    <div className="layout-padding">
      <Container>
        <Row>
          <Col lg={7} className='text-center m-auto'>
<form onSubmit={handleSubmit(onSubmit)} >
<div className="form-group">
<input  type="text" placeholder="Enter your full name" {...register("name", {    required: "Please enter your name.",
    maxLength: {
      value: 8,
      message: "Name cannot exceed 8 characters.",
    },
    minLength: {
      value: 5,
      message: "Name must be at least 5 characters.",
    },
  })} style={{borderColor:errors.name ? 'red':'black'}}
/>{errors.name && <p className='input-para'>{errors.name.message}</p>} 
<input style={{borderColor:errors.email ? 'red':'black'}} type="email" placeholder="Enter your email address"     {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address"
            }
          })}
/>  {errors.email && <p className='input-para'>{errors.email.message}</p>}
<input style={{borderColor:errors.subject ? 'red':'black'}} type="text" placeholder="Enter subject" {...register("subject", {required:"Subject is required"})}/>
{errors.subject && <p  className='input-para'>{errors.subject.message}</p>}
<textarea style={{borderColor:errors.message ? 'red':'black'}} rows="7" placeholder="Enter your message" {...register("message",{required:"Message is required",
maxLength:{
  value:200,
  message: "Message cannot exceed 200 characters.",
}
})}/>
  {errors.message && <p className='input-para'>{errors.message.message}</p>}
<button type="submit" className='submit'>Submit</button>
</div>
</form>
          </Col>
        </Row>
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
                <Button className="shop-now">Shop Now</Button>
              </div>
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

export default Contact;