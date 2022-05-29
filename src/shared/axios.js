import axios from "axios";

const lmsAPIHostProd = ""; //for production
const lmsAPIHostDev = "http://localhost:8080"; // for development

const lmsAPIHost = process.env.NODE_ENV === "development" ? lmsAPIHostDev : lmsAPIHostProd;

const instance = axios.create({
    baseURL: lmsAPIHost
});

export default instance;