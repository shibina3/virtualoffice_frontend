import React from 'react'
import { Container, Image, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaPhoneVolume } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";

export default function Contact({ setCurrentTab }) {
  return (
    <Container className="my-3">
      {/* Banner Section */}
      <Row className="position-relative mb-4">
        {/* Image with Dark Overlay */}
        <Image
          src="/assets/images/contact.webp"
          alt="home"
          className="w-100 rounded shadow"
          style={{ objectFit: 'cover', height: '350px' }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 1,
            borderRadius: '0.75rem',
          }}
        ></div>

        {/* Text Content */}
        <div
          className="position-absolute top-50 start-50 translate-middle text-center text-white"
          style={{ zIndex: 2 }}
        >
          <h1 className="fw-bold">Reach Us Here</h1>
          <p>Perfect for websites, business cards, and marketing materials.</p>
          <button className="btn btn-light btn-sm" onClick={() => setCurrentTab('pricing-plans')}>Contact Us</button>
        </div>
      </Row>

      {/* Optional Content Section */}
      <Row>
        <Col>
          <Row className='my-5'>
            <h3>Let's Connect and Begin Your Financial Success Story With Acctual</h3>
            <p className='mt-5 mb-3 text-shadow'>Contact us today to explore our tailored packages and discover how we can help you succeed! tempo.</p>
          </Row>
          <Row>
              <Row className='mb-4'>
                <Col className='d-flex align-items-center' sm={2}>
                  <FaPhoneVolume size={50} />
                </Col>
                <Col>
                  <h6>Phone</h6>
                  <p>
                    (+62) 123-321-543
                  </p>
                  <p>(+62) 123-321-543</p>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex align-items-center' sm={2}>
                  <IoLocationSharp size={50} />
                </Col>
                <Col>
                  <h6>Address</h6>
                  <p>
                    JI. Sunset Road No.815
                  </p>
                  <p>
                    Kuta, Badung, Bali
                  </p>
                </Col>
              </Row>
          </Row>
        </Col>
        <Col>
          <Card className='card-shadow'>
            <h2 className="text-center my-4">Send Us a Message</h2>
            <p className="text-center">
              For any queries or feedback, feel free to reach out!
            </p>
            <Form className="p-4">
              <Row className='mb-3'>
                <Col>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="subject" className='mb-3'>
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter the subject" />
              </Form.Group>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
              </Form.Group>
              <Col className='justify-content-center'>
                <Button variant="dark" type="submit" className="my-3 w-50">
                  Send Message
                </Button>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Banner Section */}
      <Row className="position-relative my-4">
        <Image
          src="/assets/images/contact2.jpg"
          alt="home"
          className="w-100 rounded shadow"
          style={{ objectFit: 'cover', height: '350px' }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 1,
            borderRadius: '0.75rem', 
          }}
        ></div>

        {/* Text Content */}
        <div
          className="position-absolute top-50 start-50 translate-middle text-center text-white"
          style={{ zIndex: 2 }}
        >
          <h1 className="fw-bold">Ready to elevate your business?</h1>
          <p>Contact us today to explore our tailored packages and discover how we can help you succeed!</p>
          <p>Discover how My Virtual Office can help your business thrive.</p>
        </div>
      </Row>
    </Container>
  )
}
