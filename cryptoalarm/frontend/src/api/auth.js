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

// Create Alert
export const createAlert = async (callback, token, body) => {
    const config = configToken(token);

    await axios
        .post('/api/alert', '', config, body)
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
