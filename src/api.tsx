import axios from 'axios';

const url = `http://${window.location.hostname}:3001`;

const api = {
    getBirthData: async () => {
        return axios.get(`${url}/birth-data`);
    },

    posting: async (data: any) => {
        return axios.post(`${url}/posting`, data , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    getPost: async (dir: number) => {
        return axios.get(`${url}/post/${dir.toString()}`);
    },

    getPostList: async () => {
        const res = await axios.get(`${url}/post-list`);;
        return res.data.data;
    },
};

export default api;