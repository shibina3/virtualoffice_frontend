import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image, Button, Card, Accordion } from 'react-bootstrap'
import { IoIosCheckboxOutline } from "react-icons/io";

export default function PricingPlans({ setCurrentTab, setPlanType }) {
    const [servicesAndPlans, setServicesAndPlans] = useState([]);

    useEffect(() => {
    fetchData();
    }, []);
    
    const fetchData = async () => {
    try {
        const response = await fetch('https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: "/app-details" })
        });
        const data = await response.json();
        if(data.success) {
        setServicesAndPlans(data.data.services_and_plans);
        }
    }
    catch (error) {
        console.log('error', error);
    }
    }

    const handlePurchase = (planType) => {
        setPlanType(planType);
        setCurrentTab('purchase');
    }
    return (
        <Container className="my-3">
            {/* Banner Section */}
            <Row className="position-relative mb-4">
            {/* Image with Dark Overlay */}
            <Image
                src="/assets/images/blog3.webp"
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
                <h1 className="fw-bold">Competitive Pricing Plans</h1>
                <p>
                With My Virtual Office, your business is not confined by walls
                </p>
                <p>
                but propelled by possibilities.
                </p>
            </div>
            </Row>

            <Row>
            <h3 className='text-center'>Transparent Pricing Options</h3>
            <p className='text-center mt-3 mb-0 text-shadow'>
                Pricing plans designed to meet your business needs and budget
            </p>
            <p className='text-center text-shadow'>
                Choose the plan that suits you best and start your virtual office journey today.
            </p>
            </Row>
            <Row lg={2} className='shadow my-4'>
            <Col className='p-4 price-card middle-line'>
            <Card className='pricetag'>
                <Card.Body>
                <Card.Title>Montlhy Plan</Card.Title>
                <Card.Text>
                    <span><span className='fs-1 fw-bold'>£{servicesAndPlans.reduce((acc, service) => acc + service.montly_price, 0)}</span>/ Per Month</span>
                </Card.Text>
                <Card.Text>
                    <span className='text-muted'>Select the services and complete a quick onboarding process to activate your virtual office.</span>
                </Card.Text>
                <Button variant="dark" onClick={() => handlePurchase('monthly')}>Purchase</Button>
                </Card.Body>
            </Card>
            <div className='mt-4'>
                {
                servicesAndPlans.map((service, index) => (
                    <div className='my-3' key={index}>
                    <IoIosCheckboxOutline className='text-success' />
                    <span className='ms-2'>{service.service_name}</span>
                    </div>
                ))

                }
            </div>
            </Col>
            <Col className='p-4 price-card'>
            <Card className='pricetag position-relative'>
                <Card.Body>
                <Card.Title>Yearly Plan</Card.Title>
                <span className='text-success position-absolute top-0 profit'>Profit</span>
                <Card.Text>
                    <span><span className='fs-1 fw-bold'>£{servicesAndPlans.reduce((acc, service) => acc + service.yearly_price, 0)}</span>/ Per Month</span>
                </Card.Text>
                <Card.Text>
                    <span className='text-muted'>Instantly access your new business address, phone services, and additional features.</span>
                </Card.Text>
                <Button variant="dark" onClick={() => handlePurchase('yearly')}>Purchase</Button>
                </Card.Body>
            </Card>
            <div className='mt-4'>
                {
                servicesAndPlans.map((service, index) => (
                    <div className='my-3' key={index}>
                    <IoIosCheckboxOutline className='text-success' />
                    <span className='ms-2'>{service.service_name}</span>
                    </div>
                ))

                }
            </div>
            </Col>
            <Col>

            </Col>
            </Row>
            {/* FAQ */}
            <Row>
                <h3 className='text-center mt-5 mb-4'>Common Questions Addressed</h3>
                <p className='text-center mb-0'>How Virtual Offices Enhance Profit for Your Business?</p>
                <p className='text-center'>Here are some of the questions asked frequently by the customers</p>
            </Row>
            <Row>
            <Accordion defaultActiveKey="0" className='w-100'>
                <Accordion.Item eventKey="0" className='shadow my-3 accordion'>
                    <Accordion.Header>What is a virtual office, and how does it work?</Accordion.Header>
                    <Accordion.Body>
                    A virtual office provides businesses with a professional address, mail handling, and other office services without requiring a physical workspace. With My Virtual Office, you can access a prestigious Cheshire, Widnes address, manage your mail, handle calls professionally, and book meeting rooms on demand—all while working remotely.            
                    </Accordion.Body>
                </Accordion.Item >
                <Accordion.Item eventKey="1" className='shadow my-3 accordion'>
                    <Accordion.Header>Who can benefit from using a virtual office?</Accordion.Header>
                    <Accordion.Body>
                    Virtual offices are ideal for freelancers, startups, small businesses, and even established companies looking to enhance their professional image, reduce overhead costs, or expand into new markets without committing to a physical office.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className='shadow my-3 accordion'>
                    <Accordion.Header>What services does My Virtual Office offer?</Accordion.Header>
                    <Accordion.Body>
                    <div>We provide:</div>
                    <ul>
                    <li>A prestigious business address in Cheshire, Widnes.</li>
                    <li>Mail handling and forwarding services.</li>
                    <li>Dedicated phone numbers and professional call handling.</li>
                    <li>Access to meeting rooms and day offices on demand.</li>
                    <li>Flexible packages tailored to various business needs.</li>
                    </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className='shadow my-3 accordion'>
                    <Accordion.Header>Can I use the business address for legal and marketing purposes?</Accordion.Header>
                    <Accordion.Body>
                    Yes, you can use our Cheshire, Widnes address on your website, business cards, marketing materials, and for official correspondence. However, for registering your business, check your local legal requirements to ensure compliance.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4" className='shadow my-3 accordion'>
                    <Accordion.Header>How does mail handling and forwarding work?</Accordion.Header>
                    <Accordion.Body>
                    We receive your mail at our address and notify you when it arrives. You can choose to collect it in person or have it forwarded to your preferred location for an additional fee.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5" className='shadow my-3 accordion'>
                    <Accordion.Header>Are meeting rooms included in the virtual office package?</Accordion.Header>
                    <Accordion.Body>
                    Meeting rooms are available on demand but are typically not included in basic packages. You can book fully equipped meeting rooms as and when required, with options for high-speed internet and presentation tools.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6" className='shadow my-3 accordion'>
                    <Accordion.Header>Can I have a dedicated local phone number with My Virtual Office?</Accordion.Header>
                    <Accordion.Body>
                    Yes, we provide dedicated phone numbers with professional call answering and forwarding services. Calls can be handled under your business name to enhance your professional image.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7" className='shadow my-3 accordion'>
                    <Accordion.Header>Is a virtual office suitable for remote working teams?</Accordion.Header>
                    <Accordion.Body>
                    Absolutely! A virtual office allows your team to work remotely while still maintaining a centralized business address and access to professional services like mail handling and meeting spaces.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8" className='shadow my-3 accordion'>
                    <Accordion.Header>Can I upgrade or scale my virtual office services later?</Accordion.Header>
                    <Accordion.Body>
                    Yes, our packages are designed to grow with your business. You can add or upgrade services, such as meeting room access or call handling, at any time.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="9" className='shadow my-3 accordion'>
                    <Accordion.Header>How secure is my data and communication?</Accordion.Header>
                    <Accordion.Body>
                    We prioritize the security and confidentiality of your data. All mail, calls, and other communications are handled with strict privacy protocols to ensure your business information remains safe.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
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
