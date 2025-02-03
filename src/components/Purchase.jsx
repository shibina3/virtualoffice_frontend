import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Card, Form, Alert } from 'react-bootstrap';

export default function Purchase({ planType, setCurrentTab, setBillingData, isDetailsSubmitted, setBillingForm, billingForm }) {
  const [servicesAndPlans, setServicesAndPlans] = useState([]);
  const [officeLocations, setOfficeLocations] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0.00);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://yal3d14xdf.execute-api.eu-north-1.amazonaws.com/dev/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ path: "/app-details" })
        });
        const data = await response.json();
        if (data.success) {
          setServicesAndPlans(data.data.services_and_plans);
          setOfficeLocations(data.data.office_locations);
          setBillingForm({ ...billingForm, selectedOffice: data.data.office_locations[0].id });
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    reCalculateTotalAmount();
  }, [billingForm]);

  const reCalculateTotalAmount = () => {
    let total = 0.00;
    total += parseFloat(officeLocations?.find(office => office.id === billingForm.selectedOffice)?.platform_fee) || 0.00;
    billingForm.selectedService.forEach(serviceId => {
      const service = servicesAndPlans?.find(service => service.id === serviceId);
      if (service && billingForm.selectedPlan === 'yearly') {
        total += parseFloat(service.yearly_price);
      } else if(service && billingForm.selectedPlan === 'monthly') {
        total += parseFloat(service.montly_price);
      }
    });
    setTotalAmount(total);
  };

  const handleCardClick = (officeId) => {
    setBillingForm({ ...billingForm, selectedOffice: officeId });
  };

  const handleAddService = (serviceId) => {
    if (billingForm.selectedService.includes(serviceId)) {
      setBillingForm({ ...billingForm, selectedService: billingForm.selectedService.filter(id => id !== serviceId) });
    } else {
      setBillingForm({ ...billingForm, selectedService: [...billingForm.selectedService, serviceId] });
    }
  };

  const groupedByCity = () => {
    const grouped = officeLocations.reduce((acc, office) => {
      const city = office.city;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(office);
      return acc;
    }, {});
    return grouped;
  };

  const handleBilling = () => {
    if(localStorage.getItem('user_email') === null) {
      setAlertMsg('Please login or register to purchase a plan');
      return;
    }
    if(isDetailsSubmitted === 0) {
      setAlertMsg('Please complete the verification to purchase a plan');
      return;
    }
    const billingData = {
        plan: billingForm.selectedPlan,
        office_id: billingForm.selectedOffice,
        services: billingForm.selectedService,
        total_amount: totalAmount
    }
    setBillingData(billingData);
    setCurrentTab('billing');
  };

  return (
    <Container className="my-3">
      <Row className='p-3 shadow'>
      {alertMsg && <Alert className="text-center mt-3" variant="danger">{alertMsg}</Alert>}
        <Col md={4}>
          {
            Object.keys(groupedByCity()).map((key, index) => {
              const location = groupedByCity()[key];
              const city_name = location[0].city;
              const city_image = location[0].city_image_url;
              return (
                <React.Fragment key={index}>
                  <Row className='position-relative d-flex justify-content-center mb-3'>
                    <Image
                      src={city_image}
                      alt={city_name}
                      className="w-75 rounded shadow"
                      style={{ objectFit: 'cover', height: '120px' }}
                    />
                    <div
                      className="position-absolute top-0 w-75 h-100"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1,
                        borderRadius: '0.75rem',
                      }}
                    ></div>
                    <div
                      className="position-absolute top-50 start-50 translate-middle text-center text-white"
                      style={{ zIndex: 2 }}
                    >
                      <h5 className="fw-bold">{city_name}</h5>
                    </div>
                  </Row>
                  <Row>
                    <Form>
                      {location.map((office) => (
                        <Form.Group
                          key={office.id}
                          className="mb-3 d-flex justify-content-center align-items-center"
                          controlId={`formBasicEmail-${office.id}`}
                        >
                          <Form.Check
                            type="radio"
                            checked={billingForm.selectedOffice === office.id}
                            onChange={() => handleCardClick(office.id)}
                            className="d-none"
                          />
                          <Card
                            className={`card-shadow ${billingForm.selectedOffice === office.id ? 'selected' : ''}`}
                            onClick={() => handleCardClick(office.id)}
                          >
                            <Row noGutters>
                              <Col md={5}>
                                <Card.Img variant="left" className='plan-card-img' src={office.area_image_url} />
                              </Col>
                              <Col md={7} className='ps-0'>
                                <Card.Body>
                                  <Card.Title style={{ fontSize: '16px' }}>{office.building_name}</Card.Title>
                                  <Card.Text style={{ fontSize: '12px' }}>
                                    <p className='m-0'>{office.area}, {office.city}</p>
                                    <p className='m-0'>Platform fee - <span className='fw-bold'>£{office.platform_fee}</span></p>
                                  </Card.Text>
                                </Card.Body>
                              </Col>
                            </Row>
                          </Card>
                        </Form.Group>
                      ))}
                    </Form>
                  </Row>
                </React.Fragment>
              )
            })
          }
        </Col>
        <Col md={6}>
          {
            servicesAndPlans.map((service, index) => (
              <Row key={service.id} className={`my-4 shadow p-3 ${index === 0 ? `mt-0` : ``} ${index === servicesAndPlans.length - 1 ? `mb-0` : ``}`}>
                <Col md={8}>
                  <p className='fw-bold mb-0'>{service.service_name}</p>
                  <p className='text-muted mb-0' style={{ fontSize: '10px' }}>{service.description}</p>
                </Col>
                <Col md={2}>
                  <p className='fw-bold mb-0'>£{
                    billingForm.selectedPlan === 'yearly' ? service.yearly_price : service.montly_price
                    }</p>
                  <p className='text-muted mb-0' style={{ fontSize: '10px' }}>month</p>
                </Col>
                <Col md={2}>
                  <Button variant="dark" onClick={() => handleAddService(service.id)}>{
                    billingForm.selectedService.includes(service.id) ? 'Remove' : 'Add'
                    }</Button>
                </Col>
              </Row>
            ))
          }
        </Col>
        <Col md={2} className='d-flex justify-content-center align-items-center'>
          <Row className='custom-bill'>
            <Row>
              <p className='text-center' style={{ fontSize: '10px' }}>£ <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalAmount}</span>/month</p>
            </Row>
            <Row>
              <Form className='ms-3'>
                <Form.Group controlId='monthly'>
                  <Form.Check type='radio' style={{ width: '15px' }} checked={billingForm.selectedPlan === "monthly"} label="monthly" onClick={() => setBillingForm({ ...billingForm, selectedPlan: 'monthly' })} />
                </Form.Group>
                <Form.Group controlId='yearly'>
                  <Form.Check type='radio' style={{ width: '15px' }} label="yearly" checked={billingForm.selectedPlan === "yearly"} onClick={() => setBillingForm({ ...billingForm, selectedPlan: 'yearly' })} />
                </Form.Group>
              </Form>
            </Row>
            <Button variant="dark" className='mt-4 w-50' onClick={handleBilling}>Continue</Button>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}