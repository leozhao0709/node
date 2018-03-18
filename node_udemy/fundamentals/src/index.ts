import Axios, * as axios from 'axios';

const url = 'http://maps.googleapis.com/maps/api/geocode/json?address=5600 stevens creek blvd';
const failedUrl = 'http://maps.googleapis.com/maps/api/geocode/json?address=0000000';

Axios.get(failedUrl)
    .then((res) => {
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(res.data, undefined, 2));
    })
    .catch((err) => {
        // tslint:disable-next-line:no-console
        console.log(err);
    })
    ;
