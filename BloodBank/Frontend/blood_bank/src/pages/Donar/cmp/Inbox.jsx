import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { axiosGet } from "../../../AxiosOperations";

import tempImg from '/user.png';

const MessageView = ({ message }) => {
  return (
    <div>
      <div className="bg-purple-200 px-4 py-3">
        <h2 className="text-lg font-semibold text-purple-800">MESSAGE INFO</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-lg font-semibold text-gray-800">{message.subject}</h2>
        <div className="flex items-center mt-4">
          <img className="h-8 w-8 rounded-full" src={tempImg} alt="Sender" />
          <p className="ml-2 text-sm text-gray-600">{message.subject}</p>
        </div>
        <p className="text-gray-700 mt-2">{message.message}</p>
      </div>
    </div>

  );
};


const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [inbox, setInbox] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {

    axiosGet(`donor/notification/${id}`)

      .then(data => {

        setInbox(data.data);

      })
      .catch(error => {

        console.error('Error fetching data:', error);
      });


    return () => {
      // Cleanup code goes here
    };
  }, []);


  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  return (
    <div className="bg-gradient-to-b from-purple-200 to-blue-200 min-h-screen h-auto font-sans">
      <div className="container mx-auto px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-purple-200 px-4 py-3">
                <h2 className="text-lg font-semibold text-purple-800">INBOX</h2>
              </div>
              <ul>
                {inbox.map((message) => (
                  <li key={message.id} className="border-b border-gray-200 hover:bg-purple-100 transition duration-300 ease-in-out">
                    <button className="block w-full px-6 py-4 focus:outline-none" onClick={() => handleMessageClick(message)}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={tempImg} alt="Sender" />
                        </div>
                        <div className="ml-4">
                          <p className="text-lg font-medium text-gray-800">{message.sendername}</p>
                          <p className="text-sm text-gray-600">{message.subject}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Message view */}
          <div className="col-span-1">
            {selectedMessage && <MessageView message={selectedMessage} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
