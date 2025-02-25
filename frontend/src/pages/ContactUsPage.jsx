import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

const ContactUsPage = () => {
  return (
    <div>
    <Header activeHeading={5} />
      <ContactUs/>
      <Footer />
      </div>
  )
}

const ContactUs = () => {
    return (
        <div className="container">
            Contact Us Page
        </div>
    )
};

export default ContactUsPage