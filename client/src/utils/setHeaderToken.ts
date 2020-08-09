import axios from "axios";

const setHeaderToken = (token: string): void => {
    if (token) {
        axios.defaults.headers.common["x-path-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-path-token"];
    }
};

export default setHeaderToken;
