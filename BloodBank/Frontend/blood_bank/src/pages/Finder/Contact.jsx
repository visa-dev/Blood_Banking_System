import React from 'react'

import Header from '../../components/common/Header';
import { navLinks } from '../../assets/data/HeaderData';
import { socialLinks,contactData } from '../../assets/data/FooterData';
import Footer from '../../components/common/Footer';


const Contact = () => {
  return (
    <div>
      <div>
        <Header navLinks={navLinks} />
      </div>
      <div>
        Contact
      </div>
      <div>
      <Footer navLinks1={socialLinks} navLinks2={contactData} />
      </div>
    </div>
  )
}

export default Contact