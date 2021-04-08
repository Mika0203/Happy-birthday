import axios from 'axios';

const api = {
    getBirthData : async () => {
        return axios.get('http://' + window.location.hostname + ':3001/getData');
    }
};

export default api;