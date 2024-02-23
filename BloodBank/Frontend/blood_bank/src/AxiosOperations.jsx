import axios from 'axios';

export const axiosPost = async (header, data) => {

    await axios.post(`http://localhost:8081/${header}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

        .catch(error => {

            console.error('Error:', error);
        });

}

export const axiosGet = async (header) => {

    try {
        const response = (await axios.get(`http://localhost:8081/${header}`)).data;

        if (response != null) {
            return response;
        } else {
            alert("No Data");
        }
    } catch (error) {

    }



}



