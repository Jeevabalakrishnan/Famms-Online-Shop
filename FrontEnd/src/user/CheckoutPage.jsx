import React, { useState, useEffect } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState('login');
  const [authMode, setAuthMode] = useState('login');
  const [userEmail, setUserEmail] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  const [newAddressData, setNewAddressData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  // const orderSummary = JSON.parse(localStorage.getItem("orderSummary")) || [];
  const cartItems = useSelector((state) => state.cart.items);


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
  const buyNowProduct = location.state?.buyNowProduct;
  const productsToDisplay = buyNowProduct ? [buyNowProduct] : cartItems;
  console.log(location.pathname); // Example usage
  const totalAmount = buyNowProduct
    ? buyNowProduct.price // If Buy Now, use its price only
    : cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // Otherwise, 
    const [loading, setLoading] = useState(false);


  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedStep = localStorage.getItem("checkoutStep");

    if (savedEmail) {
      setUserEmail(savedEmail);
      if (savedStep) {
        setCurrentStep(savedStep);
      } else {
        setCurrentStep('address'); // Default after login
      }
    } else {
      setCurrentStep('login'); // Force login step if not logged in
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
  
    setLoading(true); // ✅ Start Loading Animation
  
    try {
      setTimeout(async () => { // ✅ Delay login request by 3 sec
        const response = await axios.post("http://localhost:4000/api/user/login", { email, password });
  
        if (response.data.success) {
          setUserEmail(response.data.email);
          setCurrentStep("address");
  
          // ✅ Store login state in localStorage
          localStorage.setItem("userEmail", response.data.email);
          localStorage.setItem("checkoutStep", "address");
        } else {
          throw new Error(response.data.msg || "Login failed");
        }
  
        setLoading(false); // ✅ Stop Loading Animation
  
      }, 3000);
    } catch (error) {
      console.error("Login Error:", error);
      alert(`Error: ${error.message}`);
      setLoading(false); // ✅ Stop Loading Animation if failed
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
     setAuthMode('login')
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

  // const handlePlaceOrder = async () => {
  //   console.log("Placing order with data:", {
  //     email: userEmail,
  //     address: selectedAddress,
  //     paymentMethod,
  //     items: cartItems,
  //   });

  //   if (!selectedAddress || !paymentMethod || cartItems.length === 0) {
  //     alert("Please select an address, payment method, and ensure your cart has items.");
  //     return;
  //   }
  //     setLoading(true);

  //   try {
  //     setTimeout(async () => {
  //     const response = await axios.post("http://localhost:4000/api/order", {
  //       email: userEmail,
  //       address: selectedAddress,
  //       paymentMethod,
  //       items: cartItems,
  //     });

  //     console.log("Order response:", response.data);

  //     if (response.data.success) {
  //       toast.success("Order placed successfully!");
  //       await navigate("/home"); // ✅ Keeps the user in checkout flow
  //     } else {
  //       throw new Error("Order placement failed.", { position: "top-center" });
  //     }
  //     setLoading(false);
  //     setTimeout(() => {
  //       navigate('/home')
  //     },3000)
  //   },3000);
  //   } catch (error) {
  //     console.error("Order error:", error.response?.data || error.message);
  //     alert(`Order failed. Error: ${error.response?.data?.error || error.message}`);
  //   }
  // };
  // const handleCheckout = () => {
  //   if (buyNowProduct) {
  //     handlePlaceBuyNowOrder(); // ✅ Calls Buy Now order logic
  //   } else {
  //     handlePlaceOrder(); // ✅ Calls Cart order logic
  //   }
  // };

  // const handlePlaceBuyNowOrder = async () => {
  //   console.log("🔍 Buy Now Order Data Before Sending:", {
  //     email: userEmail,
  //     address: selectedAddress,
  //     paymentMethod,
  //     product: buyNowProduct, 
  //   });
  
  //   if (!selectedAddress || !paymentMethod || !buyNowProduct) {
  //     alert("Missing required fields! Please provide valid order data.");
  //     return;
  //   }
  
  //   setLoading(true);
  
  //   try {
  //     setTimeout(async () => {
  //       const response = await axios.post("http://localhost:4000/api/buy-now", {
  //         email: userEmail,
  //         address: selectedAddress,
  //         paymentMethod,
  //         product: buyNowProduct,
  //       });
  
  //       console.log("✅ Buy Now Order Response:", response.data);
  
  //       if (response.data.success) {
  //         toast.success("🎉 Buy Now Order placed successfully!", { position: "top-center" });
  
  //         // ✅ Wait 3 seconds before redirecting
  //         setTimeout(() => {
  //           navigate("/home");
  //         }, 3000);
  //       } else {
  //         throw new Error(response.data.error || "Order placement failed.");
  //       }
  
  //       setLoading(false);
  //     }, 3000);
  //   } catch (error) {
  //     console.error("❌ Buy Now Order Error:", error.response?.data || error.message);
  //     alert(`Order failed. Error: ${error.response?.data?.error || error.message}`);
  //     setLoading(false);
  //   }
  // };
  
  // useEffect(() => {
  //   const savedCart = JSON.parse(localStorage.getItem("cart"));
  //   if (savedCart && savedCart.length > 0) {
  //     dispatch(setCartItems(savedCart)); // ✅ Restore cart after login
  //   }
  // }, [userEmail, dispatch]);

 const handleCheckout = async () => {
    const orderData = buyNowProduct
        ? { email: userEmail, address: selectedAddress, paymentMethod, product: buyNowProduct }
        : { email: userEmail, address: selectedAddress, paymentMethod, items: cartItems };

    console.log("Placing order with:", orderData);

    if (!selectedAddress || !paymentMethod || (!cartItems.length && !buyNowProduct)) {
        alert("Please select an address, payment method, and ensure you have items.");
        return;
    }

    setLoading(true); // ✅ Start loading
    
    try {
        const response = await axios.post("http://localhost:4000/api/order", orderData);
        console.log("Order response:", response.data);

        if (response.data.success) {
            toast.success("Order placed successfully!");

            // ✅ Wait 3 seconds before navigating
            setTimeout(() => {
                navigate("/home");
                setLoading(false);  // ✅ Stops loading after navigation
            }, 3000);
        } else {
            throw new Error("Order placement failed.");
        }
    } catch (error) {
        console.error("Order error:", error.response?.data || error.message);
        alert(`Order failed. Error: ${error.response?.data?.error || error.message}`);
        setLoading(false); // ✅ Ensure loading state resets
    }
};
  const handleNewAddressCancel = () => {
    setNewAddressData({
      name: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
      state: '',
    });
    setSelectedAddress(false);
  };

  
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
                    <Button className="logout btn-secondary" onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                </div>
                {currentStep === 'login' && (
                  <div className="step-content">
                    <Form.Check inline type="radio" label={<span style={{ padding: '5px', marginLeft: '5px' }}>{"Login"}</span>} value="login" checked={authMode === 'login'} onChange={() => setAuthMode('login')} />
                    <Form.Check inline type="radio" label={<span style={{ padding: '5px', marginLeft: '5px' }}>{"Register"}</span>} value="register" checked={authMode === 'register'} onChange={() => setAuthMode('register')} />
                    <hr />

                    {authMode === 'login' ? (
                      <Form onSubmit={handleLogin}>

                        <Row>
                          <Col lg={3}></Col>
                          <Col>
                            <h4 className='text-center fw-bold'>Login</h4>
                            <Form.Group>
                              <Form.Label>Email</Form.Label>
                              <Form.Control className='p-3' type="email" name="email" required />
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>Password</Form.Label>
                              <Form.Control className='p-3' type="password" name="password" required />
                            </Form.Group>
                            <div className='d-flex justify-content-center'>
                            <Button
  variant="danger"
  className="text-center px-5"
  type="submit"
  disabled={loading} // ✅ Disables the button while loading
>
  {loading ? "Logging in..." : "Login"}
</Button>
                            </div>
                          </Col>
                          <Col lg={3}></Col>
                        </Row>
                      </Form>
                    ) : (
                      <Form onSubmit={handleRegister} encType="multipart/form-data">
                        <Row>
                          <h3 className='text-center'>Register</h3>
                          <Col lg={6}>
                            <Form.Group>
                              <Form.Label>Name</Form.Label>
                              <Form.Control className='p-3' type="text" name="name" required />
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group>
                              <Form.Label>Email</Form.Label>
                              <Form.Control className='p-3' type="email" name="email" required />
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group>
                              <Form.Label>Phone</Form.Label>
                              <Form.Control className='p-3' type="text" name="phone" required />
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group>
                              <Form.Label>Password</Form.Label>
                              <Form.Control className='p-3' type="password" name="password" required />
                            </Form.Group>
                          </Col>
                          <Form.Group>
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control className='p-3' type="file" name="img" accept="image/*" />
                          </Form.Group>
                          <div className='text-end'>
                            <Button className='text-end px-5' variant="danger" type="submit">Submit</Button>
                          </div>
                        </Row>
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
                          <div
                            className={`form-check ${selectedAddress === addr ? "selected-bg" : ""}`}
                          >
                            <Form.Check
                              type="radio"
                              label={
                                <span style={{ marginLeft: "15px", display: 'flex' }}>
                                  {`${addr.name}, ${addr.phone} , ${addr.address}, ${addr.city}, ${addr.pincode}`}
                                </span>
                              }
                              name="address"
                              value={addr.address}
                              checked={selectedAddress === addr}
                              onChange={() => setSelectedAddress(addr)}
                            />
                            {selectedAddress === addr && (
                              <div>
                                <button className="mt-2 btn btn-outline-warning" onClick={handleAddressContinue}>
                                  Deliver Here
                                </button>
                                {/* <button className="mt-2 ms-5 btn btn-outline-primary" > Edit Address</button> */}
                              </div>
                            )}
                          </div>

                        </div>
                      ))
                    ) : (
                      <p>No saved addresses found. Add a new one:</p>
                    )}
                    <div className={`form-check ${selectedAddress === 'new' ? "selected-bg" : ""} mt-4`}>
                      <Form.Check
                        type="radio" label={<span style={{ marginLeft: "15px", display: 'flex', }}>{"Add a new address"}</span>} name="address"
                        value="new"
                        onChange={() => setSelectedAddress('new')}
                        style={{ marginBottom: '2rem' }}
                      />
                      {selectedAddress === 'new' && (
                        <div className="new-address-form mt-3">
                          <Form>
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
                          <div className="d-flex justify-content-end">
                            <button className="delivery-btn mt-3 btn btn-success p-3" style={{ textTransform: 'uppercase', fontSize: '13px' }} onClick={handleAddressContinue}>Save And Delivery Here</button>
                            <button className="mt-3 btn btn-link text-decoration-none" onClick={handleNewAddressCancel}>Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Order Summary */}

              {currentStep === 'summary' && (
                <div className="step">
                  <div className="step-header active-header">3. ORDER SUMMARY</div>
                  <div className="step-content">
                    <div className="order-summary">

                      {productsToDisplay.length > 0 &&
                        productsToDisplay.map((item) => (
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
                                  <h6 className="fw-bold">Quantity: {buyNowProduct ? 1 : item.quantity}</h6>
                                </div>
                                <div>
                                  <h6 className="fw-bold">₹{buyNowProduct ? buyNowProduct.price.toFixed(2) : item.price.toFixed(2)}</h6>
                                  <p className="text-muted">
                                    Total: ₹{buyNowProduct ? buyNowProduct.price.toFixed(2) : (item.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between p-2">
                      <p className='text-secondary mt-3'>Order confirmation email will be sent to <span className='fw-bold'>{userEmail ? `${userEmail}` : "1. LOGIN OR SIGNUP"}</span> </p>
                      <button className="pay-btn btn btn-danger" onClick={() => setCurrentStep('payment')}>Continue to Payment</button>
                    </div>
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
                      label={<span style={{ padding: '5px', marginLeft: '5px' }}>{"Cash on Delivery"}</span>}
                      className='form-check '
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                    />
                    <div className="d-flex justify-content-end">
                      <button className="mt-3 btn btn-outline-danger" disabled={loading} onClick={handleCheckout}>{loading ? "Order placing..." : "Checkout"}</button>

                    </div>
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
              <div className="d-flex justify-content-between">
                <span>Discount</span><span style={{ color: 'green' }}>0</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery</span><span style={{ color: 'green' }}>Free</span>
              </div>
              <hr />
              <div className="price-row">
                <span>Total</span><span>₹{totalAmount.toFixed(2)}</span>
              </div>
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