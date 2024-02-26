import { Table } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react';

import { axiosGet } from '../../AxiosOperations';


const BloodBank = () => {

  const [blooddata, setBloodData] = useState([]);

  useEffect(() => {

    axiosGet('home/count')

      .then(data => {

        setBloodData(data.data);

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
      title: 'Blood Type',
      dataIndex: 'type',
      key: 'count',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    }



  ];
  return (
    <div className='grid grid-cols-1 p-[30px] '>
      <center className='homepara font-bold text-[26px]'>Blood Count</center>
      <div className='bg-slate-400 m-[50px]'>
        <Table columns={columns} dataSource={blooddata} />
      </div>

    </div>
  )
}

export default BloodBank