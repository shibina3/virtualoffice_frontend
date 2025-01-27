import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function TermsAndConditions() {
    return (
        <Container className='my-5'>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h2 className='mb-5 text-center'>MyVirtualOffice Terms and Conditions</h2>
                    <h5 className='mt-4'>1. Acceptance of Terms</h5>
                    <p>By using MyVirtualOffice services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
                    <h5 className='mt-4'>2. Service Description</h5>
                    <p>MyVirtualOffice provides virtual office services, including:</p>
                    <ul>
                        <li>
                            <p>
                                <b>Virtual Address:</b> A prestigious business address to use for your company.</p>
                        </li>
                        <li>
                            <p>
                                <b>Mail Forwarding:</b> Efficient forwarding of mail to your desired address.</p>
                        </li>
                        <li>
                            <p>
                                <b>Call Answering:</b> Professional call answering and message taking services.
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>Meeting Room Access:</b> Access to meeting rooms for client meetings or business events.
                            </p>
                        </li>
                    </ul>
                    <h5 className='mt-4'>3. Service Fees</h5>
                    <ul>
                        <li>
                            <p>
                                <b>Fees:</b> You agree to pay the fees for the services you select, as outlined in our fee schedule
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>Payment:</b> Payment is due in advance for the selected service period.
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>Late Payments:</b> Late payments may incur additional fees or result in service interruption.
                            </p>
                        </li>
                    </ul>
                    <h5 className='mt-4'>4. Service Usage</h5>
                    <ul>
                        <li>
                            <p>
                                <b>Permitted Use:</b> You agree to use the services for lawful purposes only.
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>Prohibited Use:</b> You may not use the services for illegal, harmful, or offensive activities.
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>Service Limits:</b> We may impose limits on service usage, such as the number of calls or mail items processed.
                            </p>
                        </li>
                    </ul>
                    <h5 className='mt-4'>5. Intellectual Property</h5>
                    <ul>
                        <li>
                            <p>
                                <b>Ownership:</b> All intellectual property rights, including trademarks, copyrights, and patents, related to our services belong to MyVirtualOffice.
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>License:</b> We grant you a limited, non-exclusive license to use our services.
                            </p>
                        </li>
                    </ul>
                    <h5 className='mt-4'>6. Termination</h5>
                    <ul>
                        <li>
                            <p>
                                <b>Termination by Us:</b> We may terminate your service if you violate these Terms and Conditions or fail to pay fees.
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>Termination by You:</b> You may cancel the service at any time by providing written notice.
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>Effect of Termination:</b> Upon termination, your access to our services will cease.
                            </p>
                        </li>
                    </ul>
                    <h5 className='mt-4'>7. Limitation of Liability</h5>
                    <ul>
                        <li>
                            <p>
                                <b>No Warranty:</b> Our services are provided "as is" without any warranties, express or implied.
                            </p>
                        </li>
                        <li>
                            <p>
                                <b>Limitation of Liability:</b> To the fullest extent permitted by law, MyVirtualOffice shall not be liable for any indirect, incidental, consequential, or punitive damages.
                            </p>
                        </li>
                    </ul>
                    <h5 className='mt-4'>8. Governing Law</h5>
                    <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of England and Wales.</p>
                    <h5 className='mt-4'>9. Dispute Resolution</h5>
                    <p>Any disputes arising from these Terms and Conditions shall be resolved through negotiation or mediation. If negotiation or mediation fails, the dispute shall be resolved by the English courts.</p>
                    <h5 className='mt-4'>10. Changes to Terms</h5>
                    <p>We may modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website.</p>
                </Col>
            </Row>
        </Container>
    )
}
