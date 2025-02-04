import axios from "axios";

export const API = 'http://localhost:5000';
export const fetchData = (method = 'GET', pref = '', params = {}, data = {},) => {
    return axios(`${API}/api${pref}`, {
        headers: {
            'x-auth-token': `Bearer ${localStorage?.access}`
        },
        method,
        data,
        params
    });
};