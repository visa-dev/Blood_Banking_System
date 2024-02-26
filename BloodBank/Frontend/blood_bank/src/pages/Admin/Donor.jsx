import { Table } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react';

import { axiosGet } from '../../AxiosOperations';


const Donor = () => {

  const [donordata, setDonorData] = useState([]);

  useEffect(() => {

    axiosGet('donor/alldonors')

      .then(data => {

        setDonorData(data.data);

      })
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
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    }



  ];
  return (
    <div className='grid grid-cols-1 p-[30px] '>
      <center className='homepara font-bold text-[26px]'>Donor List</center>
      <div className='bg-slate-400 m-[50px]'>
        <Table columns={columns} dataSource={donordata} />
      </div>

    </div>
  )
}

export default Donor