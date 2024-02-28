import { Table } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react';

import { axiosGet } from '../../AxiosOperations';
import Spinner1 from '../../pages/spinners/Spinner1';

const Donor = () => {

  const [donordata, setDonorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axiosGet('donor/alldonors')

      .then(data => {

        setDonorData(data.data);

      }).then(setInterval(() => {
        setLoading(false);
      }, 350))
      .catch(error => {

        console.error('Error fetching data:', error);
      });


    return () => {
      // Cleanup code goes here
    };
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'count',
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
    },
    {
      title: 'Blood Type',
      dataIndex: 'bloodgroup',
      key: 'bloodgroup',
    },
    {
      title: 'Last Donate',
      dataIndex: 'lastdonationdate',
      key: 'lastdonationdate',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a href={`mailto:${text}`} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>{text}</a>,
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    }



  ];
  return (
    <div className='grid grid-cols-1 p-[30px] '>
      <center className='homepara font-bold text-[26px]'>Donor List</center>
      {
        loading ? (<Spinner1 />) : (<div className='bg-slate-400 m-[50px]'>
          <Table columns={columns} dataSource={donordata} />
        </div>)
      }

    </div>
  )
}

export default Donor