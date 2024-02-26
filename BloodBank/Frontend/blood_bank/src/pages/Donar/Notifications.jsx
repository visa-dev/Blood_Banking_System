import React, { useState, useEffect } from 'react'
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { donorNavLinks } from '../../assets/data/HeaderData';
import { socialLinks, contactData } from '../../assets/data/FooterData';

import { axiosGet } from '../../AxiosOperations';
import { useLocation } from 'react-router-dom';
import Inbox from './cmp/Inbox';

const Notifications = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");


  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    axiosGet(`donor/notification/${id}`)

      .then(data => {

        setNotifications(data.data);

      })
      .catch(error => {

        console.error('Error fetching data:', error);
      });


    return () => {
      // Cleanup code goes here
    };
  }, []);


  return (
    <div>

      <div>
        <Header navLinks={donorNavLinks} donorloged={true} />
      </div>
      <div>
        {/* {
          notifications.map((item) =>
            <span className='block'>{item.message}</span>
          )
        } */}
        <Inbox/>
      </div>
      <div>
        <Footer navLinks1={socialLinks} navLinks2={contactData} />
      </div>
    </div>
  )
}

export default Notifications