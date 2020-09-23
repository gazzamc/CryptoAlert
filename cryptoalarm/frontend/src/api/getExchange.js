import axios from 'axios';

export const callAPI = async (callback, path) => {
    await axios
        .get(path)
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
