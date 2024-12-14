import React from 'react';
import { Navbar, Nav, Button, Container, Image } from 'react-bootstrap';
import { RiVipCrown2Fill } from "react-icons/ri";

export default function Header({ isAdmin, currentTab, setCurrentTab, isDetailsSubmitted }) {
  const handleChangeTab = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <Navbar expand="lg" className="mt-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand onClick={() => handleChangeTab('home')} className="h4 cursor-pointer">
          <Image src="/assets/images/logo.png" alt="logo" className="me-2 nav-logo" />
        </Navbar.Brand>
        
        {/* Hamburger toggle for mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto justify-content-center w-100">
            {
              isAdmin ? <></> : <>
              <Nav.Link
              className={`btn btn-primary me-2 tabs ${currentTab === 'home' ? 'active' : ''}`}
              onClick={() => handleChangeTab('home')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className={`btn btn-primary me-2 tabs ${currentTab === 'about' ? 'active' : ''}`}
              onClick={() => handleChangeTab('about')}
            >
              About
            </Nav.Link>
            <Nav.Link
              className={`btn btn-primary me-2 tabs ${currentTab === 'blog' ? 'active' : ''}`}
              onClick={() => handleChangeTab('blog')}
            >
              Blog
            </Nav.Link>
            <Nav.Link
              className={`btn btn-primary me-2 tabs ${currentTab === 'contact' ? 'active' : ''}`}
              onClick={() => handleChangeTab('contact')}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              className={`btn btn-primary me-2 tabs ${currentTab === 'my-account' ? 'active' : ''}`}
              onClick={() => handleChangeTab('my-account')}
            >
              My Account
            </Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>

        {/* Button for Complete User Details */}
        {
          localStorage.getItem('user_email') && !isAdmin ? 
          <Button variant='dark' className='me-3' onClick={() => handleChangeTab('user-details-submission')} >{isDetailsSubmitted === 0 ? 'Complete Verification' : 'Edit Details'}</Button>
          : null
        }
        {/* Button for "VIEW PLANS" */}
        {
          !isAdmin ? <Button variant="dark" onClick={() => handleChangeTab('pricing-plans')}><RiVipCrown2Fill className='color-white me-2 price-icon'/> VIEW PLANS</Button>
          : null
        }      
      </Container>
    </Navbar>
  );
}
