import axios from 'axios';

export const axiosPost = async (header, data) => {
    
    const response = await axios.post(`http://localhost:8081/${header}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
   
    return response;


}

export const axiosGet = async (header) => {


    const response = await axios.get(`http://localhost:8081/${header}`);
    return response;

}



