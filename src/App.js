import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import MyAccount from './components/MyAccount';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import './App.css';
import PricingPlans from './components/PricingPlans';
import Purchase from './components/Purchase';
import Stripe from './components/Stripe';
import PaymentSuccess from './components/PaymentSuccess';
import UserDetail from './components/UserDetail';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [planType, setPlanType] = useState('monthly');
  const [billingData, setBillingData] = useState({});
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [billingForm, setBillingForm] = useState({
    selectedPlan: planType,   // monthly or yearly
    selectedOffice: 0, // office id
    selectedService: [], // service id's
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_email: localStorage.getItem('user_email'), path: "/user-details" })
    });
    const data = await response.json();
    if(data.success) {
      setIsDetailsSubmitted(data.user.details_submitted);
      setIsAdmin(data.user.role === 'admin');
      setCurrentTab(data.user.role === 'admin' ? 'my-account' : 'home');
    }
  }
  return (
    <>
      <Header isAdmin={isAdmin} currentTab={currentTab} setCurrentTab={setCurrentTab} isDetailsSubmitted={isDetailsSubmitted} />
      {
        !isAdmin && currentTab === 'home' ? <Home setPlanType={setPlanType} setCurrentTab={setCurrentTab} /> : 
        !isAdmin && currentTab === 'about' ? <About /> :
        !isAdmin && currentTab === 'blog' ? <Blog /> :
        !isAdmin && currentTab === 'contact' ? <Contact setCurrentTab={setCurrentTab} /> :
        currentTab === 'my-account' ? <MyAccount isAdmin={isAdmin} setCurrentTab={setCurrentTab} setBillingForm={setBillingForm} /> :
        !isAdmin && currentTab === 'pricing-plans' ? <PricingPlans setCurrentTab={setCurrentTab} setPlanType={setPlanType} /> : 
        !isAdmin && currentTab === 'purchase' ? <Purchase billingForm={billingForm} setBillingForm={setBillingForm} planType={planType} setCurrentTab={setCurrentTab} setBillingData={setBillingData} isDetailsSubmitted={isDetailsSubmitted} /> : 
        !isAdmin && currentTab === 'billing' ? <Stripe billingData={billingData} setCurrentTab={setCurrentTab} /> :
        !isAdmin && currentTab === 'payment-success' ? <PaymentSuccess /> :
        !isAdmin && currentTab === 'user-details-submission' ? <UserDetail setCurrentTab={setCurrentTab} setIsDetailsSubmitted={setIsDetailsSubmitted} /> :
        null
      }
      <Footer />
    </>
  );
}

export default App;
