import React, { useState, useEffect } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { setCartItems } from '../src/CartSlice';




const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState('login');
  const [authMode, setAuthMode] = useState('login');
  const [userEmail, setUserEmail] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddressData, setNewAddressData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const dispatch = useDispatch();
  const orderSummary = JSON.parse(localStorage.getItem("orderSummary")) || [];
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  const states = [
    "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
    "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli & Daman & Diu",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal"
  ];
  const location = useLocation();
  console.log(location.pathname); // Example usage

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedStep = localStorage.getItem("checkoutStep");

    if (savedEmail) {
      setUserEmail(savedEmail);
    }

    if (savedStep) {
      setCurrentStep(savedStep);
    }
  }, []);



  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/addresses/${userEmail}`);
        if (response.data.length > 0) {
          setAddresses(response.data);
          setSelectedAddress(response.data[0]); // ✅ Default selection
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    if (userEmail) fetchAddresses();
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("checkoutStep");
    setUserEmail("");
    setCurrentStep("login");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      alert("Please fill in both Email and Password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/user/login", { email, password });
      if (response.data.success) {
        setUserEmail(response.data.email);
        setCurrentStep("address");

        // Store login state in localStorage
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("checkoutStep", "address");
      } else {
        throw new Error(response.data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.msg || "Registration failed");

      alert("Registration successful!");
      setUserEmail(responseData.email);
      setCurrentStep("address");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleAddressContinue = async () => {
    if (selectedAddress === 'new') {
      const { name, phone, address, city, pincode, state } = newAddressData;
      if (!name || !phone || !address || !city || !pincode || !state) {
        alert("Please fill in all address fields.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:4000/api/addresses", {
          email: userEmail,
          name,
          phone,
          address,
          city,
          pincode,
          state,
        });

        if (response.data.success) {
          alert("New address saved successfully!");
          setAddresses([...addresses, response.data.address]);
          setSelectedAddress(response.data.address);
          setCurrentStep("summary");
        } else {
          throw new Error("Failed to store address");
        }
      } catch (error) {
        alert(`Error: ${error.response?.data?.error || error.message}`);
      }
    } else {
      if (!selectedAddress) {
        alert("Please select an address.");
        return;
      }
      setCurrentStep("summary");
    }
  };

  const handlePlaceOrder = async () => {
    console.log("Placing order with data:", {
      email: userEmail,
      address: selectedAddress,
      paymentMethod,
      items: cartItems,
    });

    if (!selectedAddress || !paymentMethod || cartItems.length === 0) {
      alert("Please select an address, payment method, and ensure your cart has items.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/order", {
        email: userEmail,
        address: selectedAddress,
        paymentMethod,
        items: cartItems,
      });

      console.log("Order response:", response.data);

      if (response.data.success) {
        alert("Order placed successfully!");
        setCurrentStep("address"); // ✅ Keeps the user in checkout flow
      } else {
        throw new Error("Order placement failed.");
      }
    } catch (error) {
      console.error("Order error:", error.response?.data || error.message);
      alert(`Order failed. Error: ${error.response?.data?.error || error.message}`);
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && savedCart.length > 0) {
      dispatch(setCartItems(savedCart)); // ✅ Restore cart after login
    }
  }, [userEmail, dispatch]);

  return (
    <div className="checkout-container">
      <Container >
        <Row>
          <Col lg={9}>
            <div className="checkout-left">
              {/* Step 1: Login or Register */}
              <div className="step">
                <div className={`step-header ${currentStep === 'login' ? 'active-header' : ''} d-flex justify-content-between align-items-center`}>
                  <span>{userEmail ? `Logged in as: ${userEmail}` : "1. LOGIN OR SIGNUP"}</span>
                  {userEmail && (
                    <Button className="btn-secondary" onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                </div>
                {currentStep === 'login' && (
                  <div className="step-content">
                    <Form.Check inline type="radio" label="Login" value="login" checked={authMode === 'login'} onChange={() => setAuthMode('login')} />
                    <Form.Check inline type="radio" label="Register" value="register" checked={authMode === 'register'} onChange={() => setAuthMode('register')} />
                    <hr />

                    {authMode === 'login' ? (
                      <Form onSubmit={handleLogin}>
                        <h5>Login</h5>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" name="email" required />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" name="password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Login</Button>
                      </Form>
                    ) : (
                      <Form onSubmit={handleRegister} encType="multipart/form-data">
                        <h5>Register</h5>
                        <Form.Group>
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" name="name" required />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" name="email" required />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Phone</Form.Label>
                          <Form.Control type="text" name="phone" required />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" name="password" required />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Profile Image</Form.Label>
                          <Form.Control type="file" name="img" accept="image/*" />
                        </Form.Group>
                        <Button variant="success" type="submit">Submit</Button>
                      </Form>
                    )}
                  </div>
                )}
              </div>

              {/* Step 2: Address Selection */}
              {currentStep === 'address' && (
                <div className="step">
                  <div className={`step-header ${currentStep === 'address' ? 'active-header' : ''}`}>
                    2. DELIVERY ADDRESS
                  </div>
                  <div className="step-content">
                    {addresses.length > 0 ? (
                      addresses.map((addr, idx) => (
                        <div key={idx}>
                      <div>    <Form.Check
                            type="radio"
                            label={
                              <span style={{ marginLeft: "15px"}}>
                                {`${addr.name}, ${addr.address}, ${addr.city}, ${addr.pincode}`}
                              </span>
                            }
                            name="address"
                            value={addr.address}
                            checked={selectedAddress === addr}
                            onChange={() => setSelectedAddress(addr)}
                          /></div>
                          {selectedAddress === addr && (


                            <button className="mt-4 btn btn-outline-warning" onClick={handleAddressContinue}>Deliver Here</button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>No saved addresses found. Add a new one:</p>
                    )}
                    <Form.Check
                      type="radio" label={<span style={{ marginLeft: "15px", display: 'flex', marginTop: '5px' }}>{"Add a new address"}</span>} name="address"
                      value="new"
                      onChange={() => setSelectedAddress('new')}
                      style={{ marginBottom: '2.5rem', marginTop: '1rem' }}
                    />
                    {selectedAddress === 'new' && (
                      <div className="new-address-form mt-3">
                        <Form>
                          {/* Name & Phone in One Row */}
                          <Row>
                            <Col md={6}>
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  className='address-form'
                                  placeholder='Name'
                                  value={newAddressData.name}
                                  onChange={(e) => setNewAddressData({ ...newAddressData, name: e.target.value })}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  className='address-form'
                                  placeholder='Phone'
                                  value={newAddressData.phone}
                                  onChange={(e) => setNewAddressData({ ...newAddressData, phone: e.target.value })}
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          {/* Address in One Row */}
                          <Row>
                            <Col>
                              <Form.Group>
                                <Form.Control
                                  as="textarea"
                                  rows={5}
                                  placeholder='Address (Area & Street)'
                                  value={newAddressData.address}
                                  onChange={(e) => setNewAddressData({ ...newAddressData, address: e.target.value })}
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          {/* City, State & Pincode in One Row */}
                          <Row>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Control
                                  className='address-form'
                                  type="text"
                                  placeholder='City / Town'
                                  value={newAddressData.city}
                                  onChange={(e) => setNewAddressData({ ...newAddressData, city: e.target.value })}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Select
                                  className='form-select'
                                  value={newAddressData.state}
                                  onChange={(e) => setNewAddressData({ ...newAddressData, state: e.target.value })}
                                >
                                  <option value="">--Select State--</option>
                                  {states.map((state, idx) => (
                                    <option key={idx} value={state}>{state}</option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  placeholder='Pincode'
                                  className='address-form'
                                  value={newAddressData.pincode}
                                  onChange={(e) => setNewAddressData({ ...newAddressData, pincode: e.target.value })}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </Form>
                        <button className="mt-3 btn btn-success" onClick={handleAddressContinue}>Continue</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Order Summary */}
              {currentStep === 'summary' && (
                <div className="step">
                  <div className="step-header active-header">3. ORDER SUMMARY</div>
                  <div className="step-content">
                    <div className="order-summary">
                      {orderSummary.map((item) => (
                        <div key={item.id} className="order-item card mb-3 p-3 shadow">
                          <div className="row">
                            {/* Product Image */}
                            <div className="col-md-2 d-flex align-items-center">
                              <img
                                src={item.img}
                                alt={item.name}
                                style={{ width: "100px", height: "100px", borderRadius: "8px" }}
                              />
                            </div>

                            {/* Product Details */}
                            <div className="col-md-6">
                              <h5>{item.name}</h5>
                              <p className="text-muted">Seller: Trusted Seller</p>
                            </div>

                            {/* Quantity and Price (No Buttons) */}
                            <div className="col-md-4 d-flex align-items-center justify-content-between">
                              <div>
                                <h6 className="fw-bold">Quantity: {item.quantity}</h6>
                              </div>
                              <div>
                                <h6 className="fw-bold">₹{item.price.toFixed(2)}</h6>
                                <p className="text-muted">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-2" onClick={() => setCurrentStep('payment')}>Continue to Payment</Button>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 'payment' && (
                <div className="step">
                  <div className="step-header active-header">4. PAYMENT</div>
                  <div className="step-content">
                    <Form.Check
                      type="radio"
                      label="Cash on Delivery"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                    />
                    <Button className="mt-3" onClick={handlePlaceOrder}>Checkout</Button>
                  </div>
                </div>
              )}
            </div>
          </Col>
          <div className="checkout-right">
            <div className="price-box">
              <h3>PRICE DETAILS</h3>
              <div className="d-flex justify-content-between">
                <h4>Total Amount</h4> <h4>₹{totalAmount.toFixed(2)}</h4>
              </div>
              <div className="d-flex justify-content-between"><span>Discount</span><span style={{ color: 'green' }}>0</span></div>
              <div className="d-flex justify-content-between"><span>Delivery</span><span style={{ color: 'green' }}>Free</span></div>
              <hr />
              <div className="price-row"><span>Total</span><span>₹{totalAmount.toFixed(2)}</span></div>
            </div>
          </div>

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
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutPage;