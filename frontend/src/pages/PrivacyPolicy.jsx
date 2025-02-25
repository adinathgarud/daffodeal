import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

const PrivacyPolicy = () => {
  return (
    <div>
    <Header activeHeading={5} />
      <Privacy/>
      <Footer />
      </div>
  )
}

const Privacy = () => {
    return (
        <div className="container">
            Privacy Policy Page
        </div>
    )
};

export default PrivacyPolicy