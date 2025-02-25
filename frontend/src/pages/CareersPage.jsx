import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'


const CareersPage = () => {
  return (
    <div>
    <Header activeHeading={5} />
      <Careers/>
      <Footer />
      </div>
  )
}


const Careers = () => {
    return (
        <div className="container">
            Careers Page
        </div>
    )
};


export default CareersPage







