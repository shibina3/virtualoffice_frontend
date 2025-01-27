import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function PrivacyPolicy() {
  return (
    <Container className='my-5'>
        <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <h2 className='text-center'>MyVirtualOffice Privacy Policy</h2>
                <h5 className='mt-4'>1. Introduction</h5>
                <p>MyVirtualOffice ("we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you interact with our virtual office services.</p>
                <h5 className='mt-4'>2. Information We Collect</h5>
                <p>We may collect the following types of personal information from you:</p>
                <ul>
                    <li>
                        <p><b>Contact Information:</b> Name, email address, phone number, and mailing address.</p>
                    </li>
                    <li>
                        <p><b>Billing Information:</b> Credit card information and billing address.</p>
                    </li>
                    <li>
                        <p><b>Business Information:</b> Company name, business type, and industry.</p>
                    </li>
                    <li>
                        <p><b>Communication Information:</b> Correspondence with our customer support team.</p>
                    </li>
                    <li>
                        <p><b>Usage Data:</b> Information about your use of our virtual office services, including website usage, call logs, and mailbox activity.</p>
                    </li>
                </ul>
                <h5 className='mt-4'>3. How We Use Your Information</h5>
                <p>We use your personal information for the following purposes:</p>
                <ul>
                    <li>
                        <p><b>Providing Virtual Office Services:</b> To deliver our virtual office services, including mail forwarding, call answering, and virtual addresses.</p>
                    </li>
                    <li>
                        <p><b>Processing Payments:</b> To process payments for our services.</p>
                    </li>
                    <li>
                        <p><b>Customer Support:</b> To respond to your inquiries and provide customer support.</p>
                    </li>
                    <li>
                        <p><b>Improving Our Services:</b> To analyse usage data and improve our services.</p>
                    </li>
                    <li>
                        <p><b>Marketing and Communication:</b> To send you relevant marketing materials and updates about our services, if you have opted in to receive such communications.</p>
                    </li>
                    <li>
                        <p><b>Compliance with Legal Obligations:</b> To comply with applicable laws and regulations.</p>
                    </li>
                </ul>
                <h5 className='mt-4'>4. How We Share Your Information</h5>
                <p>We may share your personal information with the following third parties:</p>
                <ul>
                    <li>
                        <p><b>Service Providers:</b> We may share your information with trusted third-party service providers who assist us in delivering our services, such as payment processors, email providers, and IT support providers.</p>
                    </li>
                    <li>
                        <p><b>Legal Authorities:</b> We may disclose your information to law enforcement or regulatory authorities if required by law or to protect our rights.</p>
                    </li>
                </ul>
                <h5 className='mt-4'>5. Data Security</h5>
                <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. These measures include:</p>
                <ul>
                    <li>
                        <p><b>Encryption of sensitive data</b></p>
                    </li>
                    <li>
                        <p><b>Secure data storage</b></p>
                    </li>
                    <li>
                        <p><b>Access controls</b></p>
                    </li>
                    <li>
                        <p><b>Regular security audits</b></p>
                    </li>
                </ul>
                <h5 className='mt-4'>6. Data Retention</h5>
                <p>We retain your personal information for as long as necessary to fulfill the purposes for which it was collected or as required by law.</p>
                <h5 className='mt-4'>7. Your Rights</h5>
                <p>You have the following rights regarding your personal information:</p>
                <ul>
                    <li>
                        <p><b>Access:</b> You have the right to access and obtain a copy of your personal information.</p>
                    </li>
                    <li>
                        <p><b>Rectification:</b> You have the right to request the rectification of inaccurate or incomplete personal information.</p>
                    </li>
                    <li>
                        <p><b>Erasure:</b> You have the right to request the erasure of your personal information in certain circumstances.</p>
                    </li>
                    <li>
                        <p><b>Restriction of Processing:</b> You have the right to request the restriction of processing of your personal information in certain circumstances.</p>
                    </li>
                    <li>
                        <p><b>Data Portability:</b> You have the right to receive your personal information in a structured, commonly used, and machine-readable format and transmit it to another controller.</p>
                    </li>
                    <li>
                        <p><b>Objection:</b> You have the right to object to the processing of your personal information in certain circumstances.</p>
                    </li>
                </ul>
                <h5 className='mt-4'>8. Contact Us</h5>
                <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at info@myvirtualoffice.uk </p>
                <h5 className='mt-4'>9. Changes to This Privacy Policy</h5>
                <p>We reserve the right to modify this Privacy Policy at any time. We will notify you of any material changes by posting the updated Privacy Policy on our website.</p>
            </Col>
        </Row>
    </Container>
  )
}
