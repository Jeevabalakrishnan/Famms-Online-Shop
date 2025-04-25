import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { increment,decrement,deleteFromCart } from './CartSlice';
import { useNavigate } from "react-router-dom"; 

const Cart = () => {
  const [isLoginBoxVisible, setIsLoginBoxVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister,setIsRegister] = useState(false);
  const [isForgot,setForgot] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate =  useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleLoginClick = () => {
    setIsLoginBoxVisible(true);
    setIsRegister(false);
    setForgot(false);
  };

 const handleLogin = async (event) => {
  event.preventDefault();
  const data = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  try {
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), 
    });

    if (response.ok) {
      alert("Login successful!");
      setIsLoggedIn(true); 
      event.target.reset();
      setIsLoginBoxVisible(false);
      navigate("/cart"); 
    } else {
      const errorData = await response.json();
      alert(`Login failed: ${errorData.msg || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert(`An error occurred: ${error.message}`);
  }
};
const handleRegister = async(event) => {
  event.preventDefault();
  const data = {
    name: event.target.name.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
    password: event.target.password.value,
  };
  try {
    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), 
    });

    if (response.ok) {
      alert("Register successful!");
      event.target.reset();
      setIsRegister(false);
      setIsLoginBoxVisible(true);
    } else {
      const errorData = await response.json();
console.log(errorData);
      alert(`Register failed: ${errorData.msg || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert(`An error occurred: ${error.message}`);
  }
};

const handleUpdate = async (event) => {
  event.preventDefault();

  const data = {
      email: event.target.email.value,
      newPassword: event.target.newPassword.value,
  };

  // Validate input fields
  if (!data.email || !data.newPassword ) {
      alert("Please fill in all fields: email, newPassword");
      return;
  }

  try {
      const response = await fetch("http://localhost:4000/api/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
      });

      if (response.ok) {
          alert("Password updated successfully!");
          event.target.reset();

          // Accessibility feature
          const successMessage = document.createElement('div');
          successMessage.setAttribute('role', 'alert');
          successMessage.innerText = "Password updated successfully!";
          document.body.appendChild(successMessage);
          setTimeout(() => successMessage.remove(), 3000);
      } else {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          alert(`Update failed: ${errorData.msg || "Unknown error"}`);
      }
  } catch (error) {
      console.error('Error in POST request to /api/forgot-password:', error);
      alert(`An error occurred: ${error.message}`);
  }
};

  const onRegister = () => {
    setIsRegister(true);
  };
  const onUpdate = () => {
         setIsLoggedIn(false);
    setForgot(true);
  }
  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('You have been logged out.');
  };

  const handleClose = () => {
    setIsLoginBoxVisible(false);
    setIsRegister(false);
    setForgot(false);
  };

  return (
    <div className="commom" style={{backgroundColor:'ButtonShadow',padding:'55px'}}>
      {!isLoggedIn && (
        <div className='py-5 text-center' style={{ width: '75%', height: 'auto', margin: '20px auto', color: 'black', boxShadow: '0 0 5px 0px', backgroundColor: 'white' }}>
          <Container>
            <Row>
              <Col>
                <MdOutlineProductionQuantityLimits style={{ fontSize: '130px' }} />
                <h6>Missing Cart items?</h6>
                <p style={{ fontSize: '12px' }}>Login to see the items you added previously</p>
                <Button className='btn-secondary' style={{ width: '10%' }} onClick={handleLoginClick}>Login</Button>
              </Col>
              <Button variant="link" onClick={onRegister} className='text-decoration-none mt-3' style={{fontSize:'15px'}}>New to Famms? Create an account</Button>
            </Row>
          </Container>
        </div>
      )}
                  {isRegister && !isLoginBoxVisible && (
        <div className="login-box-overlay">
          <div className="login-box">
<Button  className="close-btn" onClick={handleClose}>X</Button>
            <Form onSubmit={handleRegister} >
            <h2 className='text-center py-2'>Registration</h2>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" name='name' placeholder="Enter name" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Phone no</Form.Label>
                <Form.Control type="number" name='phone' placeholder="Enter phone" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
               Register
              </Button>
            </Form>
          </div>
        </div>
      )}
            {isLoginBoxVisible && !isForgot && (
        <div className="login-box-overlay">
          <div className="login-box">
<Button  className="close-btn" onClick={handleClose}>X</Button>
<Form onSubmit={handleLogin}>
  <h2 className='text-center py-2'>Login</h2>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control
      type="email"
      name="email" 
      placeholder="Enter email"
      required
    />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control
      type="password"
      name="password" 
      placeholder="Password"
      required
    />
  </Form.Group>
  <Button variant="primary" type="submit">
    Login
  </Button>
  <Button
    className="ms-2"
    variant="danger"
    type="button"
    onClick={onUpdate}
  >
    Forgot-Password
  </Button>
</Form>
          </div>
        </div>
      )}
                {isForgot &&(
        <div className="login-box-overlay">
          <div className="login-box">
<Button  className="close-btn" onClick={handleClose}>X</Button>
            <Form onSubmit={handleUpdate} >
            <h2 className='text-center py-2'>Forgot</h2>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>newPassword</Form.Label>
                <Form.Control type="newPassword" name='newPassword' placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <>
          <div style={{backgroundColor:'ButtonFace'}} className="product-section">
            <h2 className='product-text text-center'>My<span>Account</span></h2>
            <Container>
              <div className="product-row">
                <Row>
    
                {cartItems.length === 0 ? (
  <p>Your cart is empty</p>
) : (
  <div className='cart-box' > 
    {cartItems.map((item) => (
      <div key={item.id} className="cart-item">
        <img 
          src={item.img} 
          style={{
            height: '200px', 
            border: '1px solid buttonface',
            padding: '15px',
            boxShadow: '0px 1px 5px 0px'
          }} 
          alt={item.image} 
        />
        <div className="ms-5 mt-3"> 
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button
            className="increment btn btn-success"
            onClick={() => dispatch(increment({ id: item.id }))}
          >
            +
          </button>
          <button
            className="decrement btn btn-dark mx-2"
            onClick={() => dispatch(decrement({ id: item.id }))}
          >
            -
          </button>
          <button
            className="delete btn btn-danger"
            onClick={() => dispatch(deleteFromCart({ id: item.id }))}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
    <hr />
    <h2>Total Amount: ${totalAmount}</h2>
  </div>
)}      </Row>
              </div>
            </Container>
          
          <div className="logout-button text-center">
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </div></div>
        </>
      )}
      <div className="cart-footer" style={{ padding: '50px' }}>
        <hr />
        <Container>
          <Row>
            <Col>
              <p>Policies: <span>Returns Policy</span> <span>Terms of use</span> <span>Security</span> <span>Privacy</span></p>
            </Col>
            <Col>
              <p>© 2007-2025 Famms.com</p>
            </Col>
            <Col>
              <p>Need help? Visit the <span style={{ color: 'blue', cursor: 'pointer' }}>Help Center Or Contact us</span></p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Cart;