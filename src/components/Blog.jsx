import React from 'react'
import { Container, Image, Row, Col, Card, Form, Button } from 'react-bootstrap';

export default function Blog() {
  const blogs = [{
    category: 'Virtual Office',
    title: 'Significant Cost Savings',
    image: '/assets/images/blog1.webp',
    content: 'Traditional office spaces come with hefty expenses, including rent, ...'
  },
  {
    category: 'Virtual Office',
    title: 'Pay-as-You-Use Services',
    image: '/assets/images/blog2.webp',
    content: 'With a virtual office, you only pay for what you need. For example,...'
  },
  ,
  {
    category: 'Virtual Office',
    title: 'Increased Productivity',
    image: '/assets/images/blog3.webp',
    content: 'By allowing employees to work remotely, businesses can reduce commuting...'
  },
  {
    category: 'Virtual Office',
    title: 'Enhanced Professional Image',
    image: '/assets/images/blog4.webp',
    content: 'A prestigious business address and professional call handling services...'
  }]
  return (
    <Container className="my-3">
      {/* Banner Section */}
      <Row className="position-relative mb-4">
        {/* Image with Dark Overlay */}
        <Image
          src="/assets/images/blog.webp"
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
          <h1 className="fw-bold">Insights Unveiled Here</h1>
          <p>With My Virtual Office, your business is not confined by walls</p>
          <p>but propelled by possibilities.</p>
        </div>
      </Row>
      <Row>
        <h3 className='text-center'>Fresh Insights & Articles</h3>
        <p className='text-center mt-3 mb-0 text-shadow'>Virtual offices have emerged as a powerful tool to help businesses streamline operations, reduce costs, and ultimately increase their bottom line.</p>
        <p className='text-center text-shadow'>Explore how virtual offices like those offered by My Virtual Office can enhance your profitability.</p>
      </Row>
      <Row>
        {blogs.map((blog, index) => (
          <Col key={index} md={6} className='my-3'>
            <Card className='shadow'>
              <Card.Img variant="top" src={blog.image} />
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>
                  {blog.content}
                </Card.Text>
                <Button variant="dark">Read More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
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
