import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

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

    if (!query || query.trim() === "") {
        return [];
    }

    const response = await axios.get(`${BASE_URL}/search/${endpoint}`, {
        params: {
            api_key: API_KEY,
            language: 'pt-BR',
            page: currentPage,
            query: encodeURIComponent(query)
        }
    });

    return response.data.results;
}

export async function getDataVideos(categoria, id) {
    const endpoint = categoria === 'filmes' ? 'movie' : 'tv';

    const response = await axios.get(`${BASE_URL}/${endpoint}/${id}/videos`, {
        params: {
            api_key: API_KEY,
            language: 'pt-BR',
        },
    });

    return response.data.results;
}
