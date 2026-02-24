import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const apiRequest = async(method, endpoint, options={}) => {
    console.log(options);
    const {data, params, headers} = options; 

    console.log(data);

    try {
        const response = await axios({
            method, 
            url: `${BASE_URL}${endpoint}`,
            data,
            params,
            withCredentials: true,
            headers: {
                ...headers,
                ...(data instanceof FormData ? {} : {"Content-Type": "application/json"})
            }
        });
        return response.data;
    } catch(error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data.message || "Something went wrong !");
        } else {
            throw new Error("Server not reachable !");
        }
    }

}