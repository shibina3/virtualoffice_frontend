import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Card, Alert, ListGroup, Form, Accordion, Image } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { IoMdDownload } from "react-icons/io";
import { FaRegFilePdf } from "react-icons/fa";
import AWS from 'aws-sdk';

const MyAccount = ({isAdmin, setCurrentTab, setBillingForm }) => {
  const [activeSidebar, setActiveSidebar] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertMsg2, setAlertMsg2] = useState("");
  const [saveChangesBtnTxt, setSaveChangesBtnTxt] = useState("Save Changes");
  const [servicesAndPlans, setServicesAndPlans] = useState([]);
  const [officeLocations, setOfficeLocations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone_number: "",
    is_member: 0,
    subscribed_plans: [],
    payments: []
  });
  const [loginForm, setLoginForm] = useState({
    nameOrEmail: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    name: "",
    phone_number: "",
    password: "",
    repeatPassword: "",
  });
  const [changeAccDetailsForm, setChangeAccDetailsForm] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [uploadFileForm, setUploadFileForm] = useState({
    user_email: "",
    files: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const getUploadedFiles = async () => {
    const response = await fetch('https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: "/uploaded-files" })
    });
    const data = await response.json();
    if (data.success) {
      setUploadedFiles(data.files);
    }
  }

  useEffect(() => {
    const user_email = localStorage.getItem("user_email");
    if (user_email) {
      getUserDetails(user_email);
      setIsLoggedIn(true);
    }
  }, []);

  const getUserDetails = async (user_email) => {

    const response = await fetch('https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node', {
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
    }

    const userDetailsRes = await fetch("https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_email, path: "/user-details" }),
    });

    const userDetailsData = await userDetailsRes.json();

    if (userDetailsData.success) {
      setUserDetails({
          name: userDetailsData.user.user_name,
          email: userDetailsData.user.user_email,
          phone_number: userDetailsData.user.phone_number,
          is_member: userDetailsData.user.is_member,
          subscribed_plans: userDetailsData.user?.subscribed_plan?.length ? JSON.parse(userDetailsData.user.subscribed_plan): [],
          payments: userDetailsData.user.payments,
          ... userDetailsData.user
      });
      setChangeAccDetailsForm({
          ...changeAccDetailsForm,
          name: userDetailsData.user.user_name,
          email: userDetailsData.user.user_email,
      });

      const allUsersRes = await fetch("https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node", {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: "/all-users" }),
      });

      const allUsersData = await allUsersRes.json();

      if(allUsersData.success) {
        if(userDetailsData.user.role === "admin") {
          setAllUsers(allUsersData.users);
        } else {
          setAllUsers(allUsersData.users.filter(user => user.id === userDetailsData.user.id));
        }
      }
      await getUploadedFiles();
    }
}

  const handleUpdateAccDetails = async () => {
    const isFormValid = validateForm('change-acc-details');
    if(isFormValid) {
        const updateAccDetailsRes = await fetch("https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...changeAccDetailsForm, path: "/update-account-details"}),
        });

        const updateAccDetailsData = await updateAccDetailsRes.json();

        if(updateAccDetailsData.success) {
            setSaveChangesBtnTxt("Updated");
            setTimeout(() => {
                setSaveChangesBtnTxt("Save Changes");
                setAlertMsg2("");
                setChangeAccDetailsForm({
                    ...changeAccDetailsForm,
                    password: "",
                    newPassword: "",
                    confirmNewPassword: ""
                });
            }, 3000);
        } else {
            setAlertMsg2(updateAccDetailsData.message);
        }
    }
  };

  const validateForm = (form) => {
    let isValid = true;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (form === "login") {
      if (!loginForm.nameOrEmail || !loginForm.password) {
        isValid = false;
        setAlertMsg("Please fill all the fields.");
      } else if (loginForm.password.length < 6) {
        isValid = false;
        setAlertMsg("Password should be at least 6 characters.");
     }
    } else if (form === "register") {
      if (
        !registerForm.email ||
        !registerForm.name ||
        !registerForm.phone_number ||
        !registerForm.password ||
        !registerForm.repeatPassword
      ) {
        isValid = false;
        setAlertMsg("Please fill all the fields.");
      } else if (registerForm.password !== registerForm.repeatPassword) {
        isValid = false;
        setAlertMsg("Password and Repeat Password should be same.");
      } else if (!emailRegex.test(registerForm.email)) {
        isValid = false;
        setAlertMsg("Please enter a valid email address.");
      } else if (registerForm.password.length < 6) {
        isValid = false;
        setAlertMsg("Password should be at least 6 characters.");
      }
    } else if (form === "change-acc-details") {
        if(!changeAccDetailsForm.password || !changeAccDetailsForm.newPassword || !changeAccDetailsForm.confirmNewPassword) {
            isValid = false;
            setAlertMsg2("Please fill all the fields.");
        } else if(changeAccDetailsForm.newPassword !== changeAccDetailsForm.confirmNewPassword) {
            isValid = false;
            setAlertMsg2("New Password and Confirm New Password should be same.");
        } else if(changeAccDetailsForm.newPassword.length < 6) {
            isValid = false;
            setAlertMsg2("New Password should be at least 6 characters.");
        }
    }
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm('login');
    if(isFormValid) {
        const loginRes = await fetch("https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node", {
            method: "POST",
            type: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...loginForm, path: "/login"}),
        });

        const loginData = await loginRes.json();

        if(loginData.success) {
            localStorage.setItem("user_email", loginForm.nameOrEmail);
            setUserDetails({
                name: loginData.user.user_name,
                email: loginData.user.user_email,
                phone_number: loginData.user.phone_number,
                is_member: loginData.user.is_member,
                subscribed_plans: loginData.user?.subscribed_plan?.length ? JSON.parse(loginData.user.subscribed_plan): [],
                payments: loginData.user.payments,
                ... loginData.user
            });
            setChangeAccDetailsForm({
                ... changeAccDetailsForm,
                name: loginData.user.user_name,
                email: loginData.user.user_email
            });
            setIsLoggedIn(true);
            window.location.reload();
        } else {
            setAlertMsg(loginData.message);
        }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm('register');
    if(isFormValid) {
        const registerRes = await fetch("https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...registerForm, path: "/register"}),
        });

        const registerData = await registerRes.json();

        if(registerData.success) {
            localStorage.setItem("user_email", registerForm.email);
            setUserDetails({
                name: registerForm.name,
                email: registerForm.email,
                phone_number: registerForm.phone_number,
                is_member: 0,
                subscribed_plans: [],
                payments: []
            });
            setChangeAccDetailsForm({
                ... changeAccDetailsForm,
                name: registerForm.name,
                email: registerForm.email
            });
            setIsLoggedIn(true);
            window.location.reload();
        } else {
            setAlertMsg(registerData.message);
        }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_email");
    setAlertMsg("");
    setAlertMsg2("");
    setIsLoggedIn(false);
    window.location.reload();
  }

  const handleChangeTab = (tab) => {
    setCurrentTab(tab);
  };

  const handleUpdatePlan = (tab) => {
    setCurrentTab(tab);
    let billingData = {
      selectedPlan: userDetails.plan_type,
      selectedOffice: userDetails.subscribed_office_id,
      selectedService: JSON.parse(userDetails.subscribed_plan)
    }
    setBillingForm(billingData);
  }

  const uploadImageToS3 = async (file) => {
    const s3 = new AWS.S3({
      accessKeyId: "AKIARKBLHXJBJMOVZ2GJ",
      secretAccessKey: "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",
      region: 'us-east-1',
    });
    const user_email = localStorage.getItem('user_email');
    const params = {
      Bucket: 'myvirtualoffices.uk',
      Key: `uploads/${user_email}/files`,
      Body: file,
      ContentType: file.type,
    };
    return s3.upload(params).promise();
  };

    const handleFileUpload = async () => {
      const payload = {};
      payload.user_email = uploadFileForm.user_email;
      payload.files = [];
      
      for(let i = 0; i < uploadFileForm?.files.length; i++) {
        let uploadedImage;
        try {
          uploadedImage = await uploadImageToS3(uploadFileForm.files[i]);
          payload.files.push(uploadedImage.Location);
        } catch (error) {
          console.error("Error uploading the image", error);
        }

      }
      const uploadFileRes = await fetch("https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...payload, path: "/upload-files"}),
      });

    const uploadFileData = await uploadFileRes.json();

    if(uploadFileData.success) {
      setUploadFileForm({
        user_email: "",
        files: null
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }

  }

  const groupUploadedFiles = () => {
    let groupedFiles = {};
    uploadedFiles.forEach(file => {
      file.user_email = allUsers.find(user => user.id == file.user_id).user_email;
      if(groupedFiles[file.user_email]) {
        groupedFiles[file.user_email].push(file);
      } else {
        groupedFiles[file.user_email] = [file];
      }
    });
    return groupedFiles;
  }

  const deleteFromS3 = async (file_path) => {
    const s3 = new AWS.S3({
      accessKeyId: "AKIARKBLHXJBJMOVZ2GJ",
      secretAccessKey: "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",
      region: 'us-east-1',
    });
    const params = {
      Bucket: 'myvirtualoffices.uk',
      Key: file_path,
    };
    return s3.deleteObject(params).promise();
  }     
  
  const handleDeleteFile = async (file_id, file_path) => {
    const deleteFileFroms3 = await deleteFromS3(file_path);
    
    if(deleteFileFroms3) {
      const deleteFileRes = await fetch("https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({file_id, path: "/delete-file"}),
      });
  
      const deleteFileData = await deleteFileRes.json();
  
      if(deleteFileData.success) {
        await getUploadedFiles();
      }
    }

  }
    
  return (
    isLoggedIn ? <Container className="my-4">
      <Card className="p-3 mb-3">
        <Row className="d-flex align-items-center">
          <Col xs="auto">
            <img
              src="/assets/images/avatar.png"
              alt="Avatar"
              className="rounded-circle me-3"
              width="50"
              height="50"
            />
          </Col>
          <Col>
            <h5>Welcome: <span className="fw-bold">{[userDetails?.name[0]?.toUpperCase(), userDetails?.name?.slice(1)]?.join('')}</span></h5>
            {/* <p className="mb-1">You have 0 messages and 0 announcements unread</p>
            <p className="mb-0">Message box size: 0 of 50</p> */}
          </Col>
        </Row>
      </Card>

      {/* Message Box */}
      {/* <Alert variant="danger" className="text-center">
        No messages found.
      </Alert> */}

      {/* Sidebar and Dashboard */}
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <ListGroup>
          <ListGroup.Item active={activeSidebar === "dashboard"} onClick={() => setActiveSidebar('dashboard')}>Dashboard</ListGroup.Item>
            {
              !isAdmin ? 
              <>
              <ListGroup.Item  active={activeSidebar === "orders"} onClick={() => setActiveSidebar('orders')}>Orders</ListGroup.Item>
              <ListGroup.Item  active={activeSidebar === "my-subscription"} onClick={() => setActiveSidebar('my-subscription')}>My Subscription</ListGroup.Item>
              </> : null
            }
            {
              isAdmin ?
              <ListGroup.Item active={activeSidebar === "uploads"} onClick={() => setActiveSidebar('uploads')}>Uploads</ListGroup.Item>:
              <ListGroup.Item active={activeSidebar === "downloads"} onClick={() => setActiveSidebar('downloads')}>Downloads</ListGroup.Item>
            }
            {
              isAdmin ?
              <ListGroup.Item active={activeSidebar === "uploaded-files"} onClick={() => {
                getUploadedFiles();
                setActiveSidebar('uploaded-files')
              }}>Files</ListGroup.Item> : null
            }
            {
              !isAdmin ? <><ListGroup.Item active={activeSidebar === "addresses"} onClick={() => setActiveSidebar('addresses')}>Addresses</ListGroup.Item>
            <ListGroup.Item active={activeSidebar === "account-details"} onClick={() => setActiveSidebar('account-details')}>Account Details</ListGroup.Item></>
            : null
            }
            <ListGroup.Item active={activeSidebar === "logout"} onClick={handleLogout}>Logout</ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Dashboard Info */}
        <Col md={9}>
          {
            activeSidebar === "dashboard" ? 
            <Card className="p-3">
                <p>
                Hello <span className="fw-bold">{[userDetails?.name[0]?.toUpperCase(), userDetails?.name?.slice(1)]?.join('')}</span> (not {[userDetails?.name[0]?.toUpperCase(), userDetails?.name?.slice(1)]?.join('')}?{" "}
                <a href="#" onClick={handleLogout} className="text-primary">Log out</a>)
                </p>
                <p>
                From your account dashboard you can view your recent orders, 
                manage your shipping and billing addresses, and edit your password 
                and account details.
                </p>
            </Card> :
            activeSidebar === "orders" ?
            <Card className={`p-3 ${userDetails.is_member === 0 ? 'no-info' : 'info'}`}>
                {
                  userDetails.is_member === 1 ? <>
                    {
                      userDetails.payments.length > 0 ?
                      <>
                        <Row>
                        <h5>Recent Orders</h5>
                        </Row>
                        <Row className="scroll-card">
                          {
                            userDetails.payments.map((payment, index) => (
                              <Card key={index} className="p-3 mb-3 ms-5 w-75">
                                <h6>Transaction ID: {payment.transaction_id}</h6>
                                <p>Order Date: {payment.created_at}</p>
                                <p>Payment Method: {payment.payment_method}</p>
                                <p>Payment Status: {payment.status}</p>
                                <p>Total: {payment.amount}</p>
                              </Card>
                            ))
                          }
                        </Row>
                      </> : null
                    }
                  </> : 
                  <><span>No order has been made yet.</span>
                  <Button variant="dark" onClick={()=> handleChangeTab('pricing-plans')}>Browse Plans</Button></>
                }
            </Card> :
            activeSidebar === "my-subscription" ?
            <Card className={`p-3 ${userDetails.is_member === 0 ? 'no-info' : 'info'}`}>
                {
                  userDetails.is_member === 1 ? <>
                    {
                      userDetails.subscribed_plans.length > 0 ?
                      <>
                        <Row className="d-flex justify-content-between">
                        <h5 className="w-25">My Plan ({userDetails.plan_type})</h5>
                        <Button variant="dark" className="me-3 change-plan-btn" onClick={()=> handleUpdatePlan('purchase')}>Change Plan</Button>
                        </Row>
                        <Row>
                        <ul className="ms-5">
                          {
                            userDetails.subscribed_plans.map((plan, index) => (
                              <li key={index}>
                                <div>{servicesAndPlans.find(service => service.id === plan).service_name}</div>
                                <div>{servicesAndPlans.find(service => service.id === plan).description
                                  }</div>
                              </li>
                            ))
                          }
                        </ul>
                        </Row>
                      </> : null
                    }
                  </> : 
                  <><span>No order has been made yet.</span>
                  <Button variant="dark" onClick={()=> handleChangeTab('pricing-plans')}>Browse Plans</Button></>
                }
            </Card> :
            activeSidebar === "downloads" ?
            <Card className={`p-3 ${userDetails.is_member === 0 ? 'no-info' : 'info'}${uploadedFiles.length > 0 ? ' scroll-card':''}`}>
                {
                  userDetails.is_member === 0 ? <>
                  <span>No downloads available yet.</span>
                  <Button variant="dark" onClick={()=> handleChangeTab('pricing-plans')}>Browse Plans</Button></> :
                  <>
                    {
                      uploadedFiles.length > 0 ? 
                        <Row>
                          {
                            uploadedFiles.map((file, index) => (
                              <Card lg={2} className="p-3 mb-3 w-25 ms-5" key={index}>
                                <Card.Body>
                                  <Card.Title className="fs-14"><FaRegFilePdf className="pdf-icon" /> {file.file_path.replace(/^.*[\\\/]/, '')}</Card.Title>
                                  <Card.Text>
                                    <p className="fs-10 mb-2">Uploaded by Admin</p>
                                    <p className="fs-10">Uploaded on: {new Date(file.created_at).toDateString()}</p>
                                    <Button className="custom-btn" variant="dark" onClick={() => {
                                      window.open(file.file_path, '_blank');
                                    }}>
                                      <GrView className="me-2" />
                                    </Button>
                                    <Button className="custom-btn" variant="dark" onClick={() => {
                                      window.open(file.file_path, '_blank');
                                    }}>
                                      <IoMdDownload className="me-2" />
                                    </Button>
                                    <Button className="custom-btn" variant="dark" onClick={() => handleDeleteFile(file.id)}><RiDeleteBin6Line /></Button>
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            ))
                          }
                        </Row>
                      : <span>No downloads available yet.</span>
                    }
                  </> 
                }
            </Card> :
            activeSidebar === "uploads" ?
            <Card className="p-3">
              <Form>
                <Form.Group className="mb-3 w-50">
                  <Form.Label>Choose User</Form.Label>
                  <Form.Control as="select" onChange={(e) => setUploadFileForm({...uploadFileForm, user_email: e.target.value})} value={uploadFileForm.user_email}>
                    <option value="">Select User</option>
                    {
                      allUsers.map((user, index) => (
                        <option key={index} value={user.user_email} >{user.user_email}</option>
                      ))
                    }
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3 w-50">
                  <Form.Label>Choose File</Form.Label>
                  <Form.Control type="file" multiple ref={fileInputRef} onChange={(e) => setUploadFileForm({...uploadFileForm, files: Array.from(e.target.files)})} />
                </Form.Group>
                <Button variant="dark" onClick={handleFileUpload}>Upload</Button>
              </Form>
            </Card> :
            activeSidebar === "uploaded-files" ?
            <Card className="p-3">
              <Accordion defaultActiveKey="0">
                {
                  Object.keys(groupUploadedFiles()).map((user, index) => (
                    <Accordion.Item eventKey={index} key={index}>
                      <Accordion.Header>{user}</Accordion.Header>
                      <Accordion.Body>
                        <Card className="p-3 mb-3">
                          <Card.Title className="ms-3">Name: {allUsers.find(users => users.user_email === user).user_name[0].toUpperCase() + allUsers.find(users => users.user_email === user).user_name.slice(1)}</Card.Title>
                          <Card.Text className="ms-3 mb-2">Email: {user}</Card.Text>
                          <Card.Text className="ms-3">Phone: {allUsers.find(users => users.user_email === user).phone_number}</Card.Text>
                          <Card.Text className="ms-3">Member: {allUsers.find(users => users.user_email === user).is_member ? 'Yes' : 'No'}</Card.Text>
                          <Card.Text className="ms-3">Organisation Name: {allUsers.find(users => users.user_email === user).organisation_name}</Card.Text>
                          <Card.Text className="ms-3">Address: {allUsers.find(users => users.user_email === user).address_line_1}, {allUsers.find(users => users.user_email === user).address_line_2}, {allUsers.find(users => users.user_email === user).city}, {allUsers.find(users => users.user_email === user).state}, {allUsers.find(users => users.user_email === user).country}. Pincode: {allUsers.find(users => users.user_email === user).zip_code}</Card.Text>
                          <Card.Text className="ms-3">Subscribed Plans: {JSON.parse(allUsers.find(users => users.user_email === user).subscribed_plan).map(plan => {
                            return servicesAndPlans.find(service => service.id === plan).service_name
                          }).join(', ')}.</Card.Text>
                          <Card.Text className="ms-3">Plan Type: {allUsers.find(users => users.user_email === user).plan_type}</Card.Text>
                          <Card.Text className="ms-3">Subscribed Office: {officeLocations?.find(office => office.id === allUsers.find(users => users.user_email === user)?.subscribed_office_id)?.building_name}</Card.Text>
                          <Card.Text className="ms-3">Purchased Date: {new Date(allUsers.find(users => users.user_email === user).purchased_date).toISOString().split('T')[0]}</Card.Text>
                          <Card.Text className="ms-3">Renewal Date: {new Date(allUsers.find(users => users.user_email === user).next_renewal_date).toISOString().split('T')[0]}</Card.Text>                        
                        </Card>
                        <ul>
                          {
                            groupUploadedFiles()[user].map((file, index) => (
                              <div className="mb-3" key={index}>
                                <span><FaRegFilePdf className="pdf-icon" /> {file.file_path.replace(/^.*[\\\/]/, '')}</span>
                                <a className="ms-5 text-black cursor-pointer" href={'https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node'+file.file_path.slice(1)} target="_blank"><IoMdDownload /></a>
                                <a className="ms-5 text-black cursor-pointer" href={'https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node'+file.file_path.slice(1)} target="_blank"><GrView /></a>
                                <a className="ms-5 text-black cursor-pointer" onClick={() => {handleDeleteFile(file.id,'https://44qtr3ig0l.execute-api.eu-north-1.amazonaws.com/default/virtualoffice-node'+file.file_path.slice(1))}} target="_blank"><RiDeleteBin6Line /></a>
                              </div>
                            ))
                          }
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))
                }
              </Accordion>
            </Card> :
            activeSidebar === "addresses" ?
            <>
                <Card className="ps-3 pt-3 mb-3">
                    <p>The following addresses will be used on the checkout page by default.</p>
                </Card>
                {
                  userDetails.address_line_1 ? 
                  <Card className="p-3">
                    <span>Billing Address</span>
                    <div className="p-3">
                      <p>{userDetails.address_line_1}, {userDetails.address_line_2}</p>
                      <p>{userDetails.city}, {userDetails.state} {userDetails.zip_code}</p>
                    </div>
                  </Card> : 
                  <Card className="p-3 address-top">
                    <span>Billing Address</span>
                    <Button variant="dark" onClick={() => setCurrentTab('user-details-submission')}>Add Address</Button>
                  </Card>
                }
            </> :
            activeSidebar === "account-details" ?
            <>
                <Card className="p-3">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={userDetails.name} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={userDetails.email} />
                        </Form.Group>
                        <Card className="p-3">
                            <h5>Change Password</h5>
                            <Form.Group className="mb-3">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control type="password" value={changeAccDetailsForm.password} onChange={(e) => setChangeAccDetailsForm({...changeAccDetailsForm, password: e.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" value={changeAccDetailsForm.newPassword} onChange={(e) => setChangeAccDetailsForm({...changeAccDetailsForm, newPassword: e.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control type="password" value={changeAccDetailsForm.confirmNewPassword} onChange={(e) => setChangeAccDetailsForm({...changeAccDetailsForm, confirmNewPassword: e.target.value})} />
                            </Form.Group>
                        </Card>
                    </Form>
                    <Row className="d-flex justify-content-center w-100 mt-3">
                        <Button className="w-25" variant="dark" onClick={handleUpdateAccDetails}>{saveChangesBtnTxt}</Button>
                    </Row>
                </Card>
                { alertMsg2 && <Alert variant="danger" className="text-center mt-3">{alertMsg2}</Alert> }
            </> :
            null
          }
        </Col>
      </Row>
    </Container> : 
    <Container className="my-4">
        <Alert className="text-center" variant="danger">You must login to view your message.</Alert>
        <Row>
            <Col>
                <Card className="p-3">
                    <h3 className="text-center">Login</h3>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username or email address <span className="required-text">*</span></Form.Label>
                            <Form.Control type="email" value={loginForm.nameOrEmail} onChange={(e) => setLoginForm({... loginForm, nameOrEmail: e.target.value})} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password <span className="required-text">*</span></Form.Label>
                            <Form.Control type="password" placeholder="Password" value={loginForm.password} onChange={(e) => setLoginForm({... loginForm, password: e.target.value})} />
                        </Form.Group>
                        <Col className="d-flex justify-content-center align-items-center">
                            <Button variant="dark" type="submit" onClick={handleLogin}>
                                Submit
                            </Button>
                        </Col>
                    </Form>
                </Card>
            </Col>
            <Col>
                <Card className="p-3">
                    <h3 className="text-center">Register</h3>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address <span className="required-text">*</span></Form.Label>
                            <Form.Control type="email" value={registerForm.email} onChange={(e) => setRegisterForm({... registerForm, email: e.target.value})} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Username <span className="required-text">*</span></Form.Label>
                            <Form.Control type="text" value={registerForm.name} onChange={(e) => setRegisterForm({... registerForm, name: e.target.value})} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mobile number <span className="required-text">*</span></Form.Label>
                            <Form.Control type="text" value={registerForm.phone_number} onChange={(e) => setRegisterForm({... registerForm, phone_number: e.target.value})} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password <span className="required-text">*</span></Form.Label>
                            <Form.Control type="password" value={registerForm.password} onChange={(e) => setRegisterForm({... registerForm, password: e.target.value})} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Repeat Password <span className="required-text">*</span></Form.Label>
                            <Form.Control type="password" value={registerForm.repeatPassword} onChange={(e) => setRegisterForm({... registerForm, repeatPassword: e.target.value})} />
                        </Form.Group>
                        <Col className="d-flex justify-content-center align-items-center">
                            <Button variant="dark" type="submit" onClick={handleRegister}>
                                Register
                            </Button>
                        </Col>
                    </Form>
                </Card>
            </Col>
            {alertMsg && <Alert className="text-center mt-3" variant="danger">{alertMsg}</Alert>}
        </Row>
    </Container>
  );
};

export default MyAccount;