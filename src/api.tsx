import axios from 'axios';
import config from './asset/config';

const url = config.serverURL;

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
        return res.data;
    },

    deletePost : async (dir : string) => {
        return await axios.delete(`${url}/post/${dir}`);
    },

    addPhoto : async (fileList : FormData) => {
        return axios.post(`${url}/add-photo`, fileList , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

    }
};

export default api;