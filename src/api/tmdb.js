import axios from "axios";

const API_KEY = '14514ec469a15f3118f1c70d35c5ae32'
const BASE_URL = 'https://api.themoviedb.org/3'

// https://api.themoviedb.org/3/movie/popular
// https://api.themoviedb.org/3/tv/popular

export async function getData(categoria, currentPage, sortOrder){
    const endpoint = categoria == 'filmes' ? 'movie' : 'tv'

    const response = await axios.get(`${BASE_URL}/${endpoint}/${sortOrder}`, {
        params: {
            api_key: API_KEY,
            language: 'pt-BR',
            page: currentPage
        }
    });

    return response.data.results;
}

export async function getDataId(categoria, id){
    const endpoint = categoria == 'filmes' ? 'movie' : 'tv'

    const response = await axios.get(`${BASE_URL}/${endpoint}/${id}`, {
        params: {
            api_key: API_KEY,
            language: 'pt-BR'
        }
    });

    return response.data;
}

export async function searchData(categoria, currentPage, query) {
    const endpoint = categoria === 'filmes' ? 'movie' : 'tv';

    const response = await axios.get(`${BASE_URL}/search/${endpoint}`, {
        params: {
            api_key: API_KEY,
            language: 'pt-BR',
            page: currentPage,
            query
        }
    });

    return response.data.results;
}
