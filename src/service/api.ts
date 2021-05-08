import axios from 'axios'
import md5 from 'crypto-js/md5';

const apiKey = '0b2ffa9ba996fee03d730d093fe3abb0'
const privateKey = '3c8a2bb393cac107d71b2c9730fa3f829f237909';

const ts = new Date().getTime();
const hash = md5(ts + privateKey + apiKey).toString();

export const api = axios.create({
    baseURL: `https://gateway.marvel.com:443/v1/public/`, 
    params: {
        ts: ts,
        apikey: apiKey,  
        hash: hash  
    }
})