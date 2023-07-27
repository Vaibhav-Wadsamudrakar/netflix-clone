import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
    // baseURL: "https://api.themoviedb.org/3/movie/550?api_key=11d38f2c05853ae679f0aa74cf9a24e1"

});

export default instance;

// "https://api.themoviedb.org/3/movie/550?api_key=11d38f2c05853ae679f0aa74cf9a24e1"