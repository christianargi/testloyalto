/* eslint no-unused-expressions: 0 */
/* eslint no-restricted-globals: 0 */

import axios from 'axios';
import swals from 'sweetalert2';

export function POST(url, body, header) {
    return axios
        .post(url, body, header)
        .then(res => {
            if (res.status == 201 || res.status == 200) {
                return res.data;
            } else if (res.status == 401) {
                //actionLogout();
                return res.data;
            } else {
                return res.data;
            }
        })
        .catch(err => {
            if (err.response != undefined) {
                if (err.response.status == 401) {
                    debugger;
                    swals({
                        title: 'Info',
                        text: err.response.data.error_description,
                        type: 'info',
                        allowOutsideClick: false,
                        confirmButtonText: 'Ya',
                    }).then(function (confirm) {
                        localStorage.clear(), location.reload();
                    });
                } else if (err.response.status == 400) {
                    if (err.response != undefined) {
                        return err.response;
                    }
                    swals({
                        title: 'Info',
                        text: err.response.data.error_description,
                        type: 'info',
                        allowOutsideClick: false,
                        confirmButtonText: 'Ya',
                    }).then(function (confirm) {
                        //actionLogout();
                    });
                } else if (err.response.status == 500) {
                    swals({
                        title: 'Info',
                        text: 'Whoops,... Something Wrong with Server (with Code :500)',
                        type: 'info',
                        allowOutsideClick: false,
                        confirmButtonText: 'Ya',
                    }).then(function (confirm) {
                        //actionLogout();
                    });
                } else {
                    debugger;
                    swals({
                        title: 'Info',
                        text: `(with Code : ${err.message})`,
                        type: 'info',
                        allowOutsideClick: false,
                        confirmButtonText: 'Ya',
                    }).then(function (confirm) {
                        //actionLogout();
                    });
                }
            } else {
                debugger;
                swals({
                    title: 'Info',
                    text: err.message,
                    type: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                    //actionLogout();
                });
            }
        });
}

export function GET(url, header) {
    console.log(url);
    let cancelToken;

    if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
    }

    cancelToken = axios.CancelToken.source();

    return axios
        .get(url, header, { cancelToken: cancelToken.token })
        .then(res => {
            if (res.status == 200) {
                return res.data;
            } else if (res.status == 401) {
                return res.data;
            } else {
                return res.data;
            }
        })
        .catch(err => {
            if (err.response.status == 401) {
                swals({
                    title: 'Info',
                    text: err.response.data.error_description,
                    type: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                    localStorage.clear(), location.reload();
                });
            }
            return err;
        });
}

export function PUT(url, body, header) {
    return axios
        .put(url, body, header)
        .then(res => {
            if (res.status == 200) {
                return res.data;
            } else if (res.status == 401) {
                //actionLogout();
                return res.data;
            } else {
                return res.data;
            }
        })
        .catch(err => {
            if (err.response.status == 401) {
                swals({
                    title: 'Info',
                    text: err.response.data.error_description,
                    type: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                    localStorage.clear(), location.reload();
                });
            }
            return err;
        });
}

export function DELETE(url, header) {
    return axios
        .delete(url, header)
        .then(res => {
            if (res.status == 200) {
                return res.data;
            } else if (res.status == 401) {
                //actionLogout();
                return res.data;
            } else {
                return res.data;
            }
        })
        .catch(err => {
            if (err.response.status == 401) {
                swals({
                    title: 'Info',
                    text: err.response.data.error_description,
                    type: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ya',
                }).then(function (confirm) {
                    localStorage.clear(), location.reload();
                });
            }
            return err;
        });
}