import React from 'react'
import { Container } from 'react-bootstrap';
import { MdOutlineDownloadDone } from "react-icons/md";


export default function PaymentSuccess() {
  return (
    <Container className="custom-payment-container my-3">
      <div className="text-center">
        <MdOutlineDownloadDone size={100} color="#28a745" />
        <h2 className="mt-3">Payment Successful</h2>
      </div>
    </Container>
  )
}
