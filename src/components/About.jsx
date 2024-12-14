import React from 'react'
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap'

export default function About() {
  const profiles = [{
    name: "Jorgie Bowden",
    occupation: "Budget Analyst",
    image: "/assets/images/profile1.webp",
  },
  {
    name: "Kristin Hoover",
    occupation: "Senior Accountant",
    image: "/assets/images/profile2.webp",
  },{
    name: "Nayla Solomon",
    occupation: "Financial Analyst",
    image: "/assets/images/profile3.webp",
  }]
  return (
    <Container className="my-3">
      {/* Banner Section */}
      <Row className="position-relative mb-4">
        {/* Image with Dark Overlay */}
        <Image
          src="/assets/images/about.webp"
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
          <h1 className="fw-bold">Our Proud Journey</h1>
          <p>
            With My Virtual Office, your business is not confined by walls
          </p>
          <p>
            but propelled by possibilities.
          </p>
        </div>
      </Row>
      <Row>
        <Col lg={5}>
          <Image src="/assets/images/about1.webp" alt="about" className="w-100 rounded shadow" />
        </Col>
        <Col className='ps-5' lg={7}>
          <Row className='my-5'>
            <h3>Tailored Solutions for Your Financial Growth, Explore Opportunities with Us</h3>
          </Row>
          <Row>
            <Col  className='my-3'>
              <p>Contact us today to explore our tailored packages and discover how we can help you succeed!</p>
              <p className='mt-4'>In today’s ever-evolving digital landscape, the concept of an office has transformed. At My Virtual Office, we redefine what it means to operate a business by offering a flexible and innovative solution tailored to modern entrepreneurs and enterprises.</p>
            </Col>
            <Col className='my-3'>
              <Row>
                <h5>24/7 Support</h5>
                <p>
                  We are here to help you with any queries you may have. Our dedicated team is available 24/7 to provide you with the support you need.
                </p>
              </Row>
              <Row>
                <h5>Proffesional Team</h5>
                <p>
                  Our team of experts is here to help you succeed. With years of experience in the industry, we are well-equipped to provide you with the support you need.
                </p>
              </Row>
            </Col>
          </Row>
          <Row className='my-5'>
            <Col className='d-flex justify-content-center right-border'>
              <Image src="/assets/images/sign.webp" alt="about" className="w-50" />
            </Col>
            <Col>
              <h6>Brodie Rogers</h6>
              <span>– Founder Profirm</span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='my-5'>
        <h3 className='text-center'>Tailored Financial Support</h3>
        <p className='mb-0 text-center'>
          We offer a range of tailored financial support services to help you succeed.
        </p>
        <p className='text-center'>
          Discover how My Virtual Office can help your business
        </p>
      </Row>
      <Row>
        <Col>
          <Card className="p-5 card-shadow">
            <h5 className='text-center mt-3'>Personalized Service Delivery</h5>
            <p>
              Our team of experts is here to help you succeed. With years of experience in the industry, we are well-equipped to provide you with the support you need.
            </p>
            <Button className='text-decoration-none text-dark' variant="link">Read More</Button>
          </Card>
        </Col>
        <Col>
          <Card className="p-5 card-shadow">
            <h5 className='text-center mt-3'>Client Feedback Integration</h5>
            <p>
              We are here to help you with any queries you may have. Our dedicated team is available 24/7 to provide you with the support you need.
            </p>
            <Button className='text-decoration-none text-dark' variant="link">Read More</Button>
          </Card>
        </Col>
      </Row>
      <Row>
        <h3 className='text-center my-5'>Meet With Our Expert</h3>
        <p className='mb-0 text-center'>
          With years of experience in the industry, we are well-equipped to provide you with the support you need.
        </p>
        <p className='text-center'>
          Discover how My Virtual Office can help your business
        </p>
      </Row>
      <Row>
        {
          profiles.map((profile, index) => (
            <Col key={index} md={4} className='my-3'>
              <Card className='shadow'>
                <Card.Img variant="top" src={profile.image} />
                <Card.Body>
                  <Card.Title>{profile.name}</Card.Title>
                  <Card.Text>
                    {profile.occupation}
                  </Card.Text>
                  <Button variant="dark">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
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
