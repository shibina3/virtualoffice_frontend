import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import AWS from 'aws-sdk';

export default function UserDetail({ setCurrentTab, setIsDetailsSubmitted }) {
    const [userDetailForm, setUserDetailForm] = useState({
        organisation_name: '',
        representation_type: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
        purpose: '',
        service_start_date: '',
        post_handling: '',
        photo_proof: '',
        proof_of_address: '',
        source_of_discovery: '',
        comments: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch('https://yal3d14xdf.execute-api.eu-north-1.amazonaws.com/dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_email: localStorage.getItem('user_email'), path: "/user-details" })
        });
        const {user: data} = await response.json();
        setUserDetailForm({
            organisation_name: data.organisation_name || '',
            representation_type: data.representation_type || '',
            address_line_1: data.address_line_1 || '',
            address_line_2: data.address_line_2 || '',
            city: data.city || '',
            state: data.state || '',
            country: data.country || '',
            zip_code: data.zip_code || '',
            purpose: data.purpose || '',
            service_start_date: data.service_start_date ? new Date(data.service_start_date).toISOString().split('T')[0] : '',
            post_handling: data.post_handling || '',
            photo_proof: data.photo_proof || '',
            proof_of_address: data.proof_of_address || '',
            source_of_discovery: data.source_of_discovery || '',
            comments: data.comments || ''
        });
    }

    const handleChange = (key, value) => {
        setUserDetailForm({ ...userDetailForm, [key]: value });
    }

    const uploadImageToS3 = async (file) => {
        const s3 = new AWS.S3({
          accessKeyId: "AKIAXGZAL7SEB377ECFN",
          secretAccessKey: "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",
          region: 'eu-north-1',
        });
        const user_email = localStorage.getItem('user_email');
        const params = {
          Bucket: 'myvirtualoffice.uk',
          Key: `uploads/${user_email}/bio/${file.name}`,
          Body: file,
          ContentType: file.type,
        };
        return s3.upload(params).promise();
      };

    const handleFileChange = async (e, key) => {
        const file = e.target.files[0];
        let uploadedImage;
        try {
            uploadedImage = await uploadImageToS3(file);
            handleChange(key, uploadedImage.Location);
            setErrorMessage('');
          } catch (error) {
            handleChange(key, '');
            setErrorMessage('Error uploading image');
            return;
          }
    }

    const validateForm = () => {
        // validate all fields except source_of_discovery and comments
        const requiredFields = ['organisation_name', 'representation_type', 'address_line_1', 'address_line_2', 'city', 'state', 'country', 'zip_code', 'purpose', 'service_start_date', 'post_handling', 'photo_proof', 'proof_of_address'];
        for (let i = 0; i < requiredFields.length; i++) {
            if (!userDetailForm[requiredFields[i]]) {
                return false;
            }
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(validateForm()) {
        
            const payload = {
                ...userDetailForm,
                service_start_date: new Date(userDetailForm.service_start_date).toISOString().split('T')[0],
                user_email: localStorage.getItem('user_email'),
                path: "/submit-details"
            }

            const submitData = await axios.post('https://yal3d14xdf.execute-api.eu-north-1.amazonaws.com/dev/', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (submitData.status) {
                setIsDetailsSubmitted(1);
                setCurrentTab('home');
            }
        } else {
            setErrorMessage('Please fill all the required fields');
        }
    }

    return (
        <Container className="my-3">
            <Row className='d-flex justify-content-center'>
                <Form className='w-50' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Organisation Name *</Form.Label>
                        <Form.Control type="text" placeholder="Enter organisation name" value={userDetailForm.organisation_name} onChange={(e) => handleChange('organisation_name', e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Representation Type *</Form.Label>
                        <Form.Control type="text" placeholder="Enter representation type" value={userDetailForm.representation_type} onChange={(e) => handleChange('representation_type', e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Address Line 1 *</Form.Label>
                        <Form.Control type="text" placeholder="Enter address line 1" value={userDetailForm.address_line_1} onChange={(e) => handleChange('address_line_1', e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Address Line 2 *</Form.Label>
                        <Form.Control type="text" placeholder="Enter address line 2" value={userDetailForm.address_line_2} onChange={(e) => handleChange('address_line_2', e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>City *</Form.Label>
                        <Form.Control type="text" placeholder="Enter city" value={userDetailForm.city} onChange={(e) => handleChange('city', e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>State *</Form.Label>
                        <Form.Control type="text" placeholder="Enter state" value={userDetailForm.state} onChange={(e) => handleChange('state', e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Country *</Form.Label>
                        <Form.Control type="text" placeholder="Enter country" value={userDetailForm.country} onChange={(e) => handleChange('country', e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Zip Code *</Form.Label>
                        <Form.Control type="text" placeholder="Enter zip code" value={userDetailForm.zip_code} onChange={(e) => handleChange('zip_code', e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Purpose *</Form.Label>
                        <Form.Control type="text" placeholder="Enter purpose" value={userDetailForm.purpose} onChange={(e) => handleChange('purpose', e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Service Start Date *</Form.Label>
                        <Form.Control type="date" placeholder="Enter date" value={userDetailForm.service_start_date} onChange={(e) => handleChange('service_start_date', e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Post Handling *</Form.Label>
                        <Form.Control as="select" value={userDetailForm.post_handling} onChange={(e) => handleChange('post_handling', e.target.value)}>
                            <option value="">Select post handling</option>
                            <option value="open_scan">Open, scan and mail to me</option>
                            <option value='advise'>Advise me of post received and await instruction</option>
                            <option value='forward_unopened'>Always forward my post unopened</option>
                            <option value='collect'>Collect my post in person</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Photo Proof *</Form.Label>
                        <Form.Control type="file" onChange={(e) => handleFileChange(e, 'photo_proof')} accept="image/*" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Proof of Address *</Form.Label>
                        <Form.Control type="file" onChange={(e) => handleFileChange(e, 'proof_of_address')} accept="image/*" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Source of Discovery</Form.Label>
                        <Form.Control as="select" value={userDetailForm.source_of_discovery} onChange={(e) => handleChange('source_of_discovery', e.target.value)}>
                            <option value="">Select source of discovery</option>
                            <option value="google">Google</option>
                            <option value="recommended_by_a_member">Recommended by a member</option>
                            <option value="newspaper">Newspaper</option>
                            <option value="general_word_of_mouth">General word of mouth</option>
                            <option value="walking_past_the_door">Walking past the door</option>
                            <option value="other">Other</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='ps-1'>Comments</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter comments" value={userDetailForm.comments} onChange={(e) => handleChange('comments', e.target.value)} />
                    </Form.Group>

                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    <div className='d-flex justify-content-center'>
                        <Button variant="dark" type="submit">Save Changes</Button>
                    </div>
                </Form>
            </Row>
        </Container>
    )
}