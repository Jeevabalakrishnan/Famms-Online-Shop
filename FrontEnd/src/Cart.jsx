import { Container, Row, Col, Button} from 'react-bootstrap';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, deleteFromCart } from './CartSlice';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import Table from 'react-bootstrap/Table';
const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch({ type: "cart/setCart", payload: JSON.parse(savedCart) });
    }
  }, [dispatch]);

  const handlePlaceOrder = () => {
    localStorage.setItem("orderSummary", JSON.stringify(cartItems));
    navigate("/checkoutpage");
  };
  
  return (
    <div className="commom" style={{ backgroundColor: 'ButtonShadow' }}>
      <Container fluid>
      <>
        <div style={{ backgroundColor: 'ButtonFace' }} className="product-section">
          <Container fluid>
            <h4 className=' fs-1 text-secondary ms-5'>Shopping Cart</h4>
            <div className="product-row">
              <Row>

                {cartItems.length === 0 ? (
                  <div className='py-5 text-center' style={{ width: '100%', height: 'auto', margin: '20px auto', color: 'black', boxShadow: '0 0 5px 0px', backgroundColor: 'white' }}>
                    <Container>
                      <Row>
                        <Col>
                          <MdOutlineProductionQuantityLimits style={{ fontSize: '130px' }} />
                          <h6 className='mt-2'> Your shopping cart is empty!</h6>
                        </Col>

                      </Row>
                    </Container>
                  </div>
                ) : (
                  <div className='cart-box' >
                    <Table striped bordered style={{verticalAlign:'text-top'}}  className="table table-bordered text-center ">
                    <thead>
             <tr>
             <th style={{ backgroundColor: "gray", color: "white" }}>Image</th>
             <th style={{ backgroundColor: "gray", color: "white" }}>Product Name</th>
             <th style={{ backgroundColor: "gray", color: "white" }}>Quantity</th>
             <th style={{ backgroundColor: "gray", color: "white" }}>Unit Price</th>
             <th style={{ backgroundColor: "gray", color: "white" }}>Total Price</th>
             <th style={{ backgroundColor: "gray", color: "white" }}>Actions</th>
                </tr>
                   </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img
                                src={item.img}
                                style={{ height: '80px', border: '1px solid buttonface', padding: '5px' }}
                                alt={item.name}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>  <button
                                className="btn btn-dark mx-2"
                                onClick={() => dispatch(decrement({ id: item.id }))}
                              >
                                -
                              </button> {item.quantity}   <button className="btn btn-success mx-1"
                                onClick={() => dispatch(increment({ id: item.id }))}
                              >
                                +
                              </button>                   </td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                            <td>

        
                              <button
                                className="btn btn-danger mx-1"
                                onClick={() => dispatch(deleteFromCart({ id: item.id }))}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <hr />
                    <h2 className="mt-3 d-flex justify-content-end ">Total Amount: ${totalAmount.toFixed(2)}</h2>
                  </div>
                )}     
                          {cartItems.length !== 0 && (
            <div className="place-order-button text-end me-5 mt-2">
           <Button className="btn-secondary" style={{ width: '10%' }} onClick={handlePlaceOrder}>
  Place Order
</Button>

            </div>  )} 
        </Row>
            </div>
            </Container>
        </div>
      </>

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
      </Container>
    </div>
  );
}

export default Cart;



