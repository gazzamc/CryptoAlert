import axios from 'axios';

// Login User and retrieve token
export const login = async (callback, username, password) => {
    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    // Body
    const body = JSON.stringify({ username, password });

    await axios
        .post('/api/auth/login', body, config)
        .then((response) =>
            callback({
                data: response.data,
                status: response.status,
            })
        )
        .catch((error) =>
            callback({
                status: error.response.status,
            })
        );
};

// Register User
export const registerUser = async (callback, username, password, email) => {
    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    // Body
    const body = JSON.stringify({ username, password, email });

    await axios
        .post('/api/auth/register', body, config)
        .then((response) =>
            callback({
                data: response.data,
                status: response.status,
            })
        )
        .catch((error) =>
            callback({
                data: error.response,
                status: error.status,
            })
        );
};

// Logout User
export const logoutUser = async (callback, token) => {
    const config = configToken(token);

    await axios
        .post('/api/auth/logout', '', config)
        .then((response) =>
            callback({
                status: response.status,
            })
        )
        .catch((error) =>
            callback({
                status: error.response.status,
            })
        );
};

// Get User Details/ Check if valid token
export const getUser = async (callback, token) => {
    const config = configToken(token);
    await axios
        .get('/api/auth/user', config)
        .then((response) =>
            callback({
                data: response.data,
                status: response.status,
            })
        )
        .catch((error) =>
            callback({
                status: error.response.status,
            })
        );
};

// Delete User Details
export const deleteUser = async (callback, token) => {
    const config = configToken(token);
    await axios
        .delete('/api/auth/user', config)
        .then((response) =>
            callback({
                status: response.status,
            })
        )
        .catch((error) =>
            callback({
                status: error.response.status,
            })
        );
};

// Edit User Details
export const editUser = async (callback, token, username, email) => {
    const config = configToken(token);
    const body = JSON.stringify({ username, email });

    await axios
        .put('/api/auth/user', body, config)
        .then((response) =>
            callback({
                data: response,
                error: response.error,
                status: response.status,
            })
        )
        .catch((error) =>
            callback({
                error: error.response,
                status: error.response.status,
            })
        );
};

// Get Alerts
export const getAlerts = async (callback, token) => {
    const config = configToken(token);

    await axios
        .get('/api/alert', config)
        .then((response) =>
            callback({
                data: response.data,
                status: response.status,
            })
        )
        .catch((error) =>
            callback({
                status: error.response.status,
            })
        );
};

// single
export const getAlert = async (callback, path, token) => {
    const config = configToken(token);

    await axios
        .get(path, config)
        .then((response) =>
            callback({
                data: response.data,
                status: response.status,
            })
        )
        .catch((error) =>
            callback({
                status: error.response.status,
            })
        );
};

// Create Alert
export const createAlert = async (callback, token, body) => {
    const config = configToken(token);

    await axios
        .post('/api/alert/', body, config)
        .then((response) =>
            callback({
                data: response,
                status: response.status,
            })
        )
        .catch((error) =>
            callback({
                data: error.response.data,
                status: error.response.status,
            })
        );
};

export const editAlert = async (callback, token, body, id) => {
    const config = configToken(token);

    await axios
        .put(`/api/alert/${id}/`, body, config)
        .then((response) =>
            callback({
                data: response,
                status: response.status,
            })
        )
        .catch((error) =>
            callback({
                data: error,
                status: error.response.status,
            })
        );
};

// delete Alert
export const deleteAlert = async (callback, token, id) => {
    const config = configToken(token);

    await axios
        .delete(`/api/alert/${id}/`, config)
        .then((response) =>
            callback({
                status: response.status,
            })
        )
        .catch((error) =>
            callback({
                status: error.response.status,
            })
        );
};

export const configToken = (token) => {
    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Token ${token}`,
        },
    };

    return config;
};
