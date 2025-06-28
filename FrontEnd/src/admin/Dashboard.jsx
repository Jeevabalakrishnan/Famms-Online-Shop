import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";


const Dashboard = () => {
  return (
    <div className=" d-flex">
      <Container fluid className="py-4 bg-light min-vh-100">
        <h1 className="mb-4 header-name">Dashboard</h1><Link to='/dashboard' className='defalut'>Home<MdOutlineKeyboardArrowRight /></Link>
        <Row className="mb-4">
          <Col md={3} sm={6} className="mb-3">
            <Card >
         <Card.Header className="d-flex" as='h6'>
  TOTAL ORDERS <span className="ms-auto">0%</span>
</Card.Header>
              <Card.Body>       
              <FaCartShopping style={{fontSize:'40px',display:'inline-block'}} />  <h4 style={{display:'inline-block',float:'right'}} >0</h4>           
              </Card.Body>
              <Card.Footer>View more...</Card.Footer>   
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card>
              <Card.Header>TOTAL SALES</Card.Header>
              <Card.Body>
              <FaRegCreditCard style={{fontSize:'40px',display:'inline-block'}}/>
              <h4 style={{display:'inline-block',float:'right'}} >0</h4>           
              </Card.Body>
              <Card.Footer>View more...</Card.Footer>   
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card>
              <Card.Header>TOTAL CUSTOMERS</Card.Header>
              <Card.Body>
              <FaUser style={{fontSize:'40px',display:'inline-block'}}/>
              <h4 style={{display:'inline-block',float:'right'}} >1</h4>     
              </Card.Body>
              <Card.Footer>View more...</Card.Footer>   
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card >
              <Card.Header>PEOPLE ONLINE</Card.Header>
              <Card.Body>
              <FaUsers  style={{fontSize:'40px',display:'inline-block'}}/>
              <h4 style={{display:'inline-block',float:'right'}} >0</h4>
              </Card.Body>
              <Card.Footer>View more...</Card.Footer>   
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>World Map</Card.Title>
                <div className="bg-primary map-box bg-opacity-25  d-flex align-items-center justify-content-center rounded">
                 <p className="p-5 "> Map Placeholder</p></div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Sales Analytics</Card.Title>
                <div className="bg-secondary chart-box bg-opacity-25 d-flex align-items-center justify-content-center rounded">
                  <p className="p-5 text-mute ">Chart Placeholder</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;