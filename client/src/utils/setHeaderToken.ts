import axios from "axios";

const setHeaderToken = (token: string): void => {
    if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
};

export default setHeaderToken;
