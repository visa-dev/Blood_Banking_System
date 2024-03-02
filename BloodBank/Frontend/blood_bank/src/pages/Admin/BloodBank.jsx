import { Table } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react';

import { axiosGet } from '../../AxiosOperations';
import Spinner1 from '../../pages/spinners/Spinner1';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const BloodBank = () => {

  const [blooddata, setBloodData] = useState([]);
  const [loading, setLoading] = useState(true);


  const addCount = async (id, count) => {

    try {

      await axiosGet(`home/bloodbank/updatecount/${id}/${count}/add`).then(alert("Succesfully Added Blood Unit"))

    } catch (error) {
      alert(error.message);
    }
  }

  const subCount = async (id, count) => {


    try {

      await axiosGet(`home/bloodbank/updatecount/${id}/${count}/sub`).then(alert("Succesfully Delete Blood Unit"));

    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {

    axiosGet('home/bloodbank/count')

      .then(data => {

        setBloodData(data.data);


      }).then(setInterval(() => {
        setLoading(false);
      }, 1000))
      .catch(error => {

        console.error('Error fetching data:', error);
      });


    return () => {
      // Cleanup code goes here
    };
  }, [addCount, subCount]);


  const columns = [
    {
      title: 'Blood Type',
      dataIndex: 'type',
      key: 'count',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'countdata',
      render: (count, record) => (
        <span>{count} units</span>
      )
    },
    {
      key: 'Action',
      title: 'Actions',
      render: (recode) => {
        const tempData = JSON.stringify(recode);
        const row = JSON.parse(tempData);

        return <>
          <div key={recode.key} className='flex gap-7 '>

            <PlusCircleOutlined className='text-xl' onClick={() => addCount(row.id, row.count)} />
            <MinusCircleOutlined className='text-xl' style={{ color: 'red' }} onClick={() => subCount(row.id, row.count)} />

          </div>
        </>
      }
    }



  ];
  return (
    <div className='grid grid-cols-1 p-[30px] '>
      <center className='homepara font-bold text-[26px]'>Blood Count</center>
      <div className='responsive-table  pt-[40px] pb-[40px] bg-slate-100 h-[70vh]'>
        {
          loading ? (<Spinner1 />) : (<div className='bg-slate-400 m-[50px]'>
            <Table  columns={columns} dataSource={blooddata} />
          </div>)
        }

      </div>

    </div >
  )
}

export default BloodBank