import { Table } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react';

import { axiosGet } from '../../AxiosOperations';
import Spinner1 from '../../pages/spinners/Spinner1';

const AllRequests = () => {

  const [donordata, setDonorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axiosGet('finder/allrequests')

      .then(data => {

        setDonorData(data.data);

      }).then(setInterval(() => {
        setLoading(false);
      }, 250))
      .catch(error => {

        console.error('Error fetching data:', error);
      });


    return () => {
      // Cleanup code goes here
    };
  }, []);

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'patientname',
      key: 'patientname',
    },
    {
      title: 'Doctor',
      dataIndex: 'doctorname',
      key: 'doctorname',
    },

    {
      title: 'Blood Type',
      dataIndex: 'bloodgroup',
      key: 'bloodgroup',
    },
    {
      title: 'When Need',
      dataIndex: 'datewhenneed',
      key: 'datewhenneed',
      render: (text) => <div style={{ color: 'red', fontWeight: 'bold' }}>{text}</div>
    },
    {
      title: 'Hospital',
      dataIndex: 'hospitalname',
      key: 'hospitalname',
    },
    {
      title: 'Contact Name',
      dataIndex: 'contactname',
      key: 'contactname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a href={`mailto:${text}`} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>{text}</a>,
    },
    ,
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
    }



  ];


  return (
    <div className='grid grid-cols-1 p-[30px] '>
      <center className='homepara font-bold text-[26px]'>Donor List</center>
      <div className='responsive-table  pt-[40px] pb-[40px] bg-slate-100 h-[70vh]'>
        {
          loading ? (<Spinner1 />) : (<div className='bg-slate-400 m-[50px]'>
            <Table columns={columns} dataSource={donordata} />
          </div>)
        }

      </div>

    </div>
  )
}

export default AllRequests