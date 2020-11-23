import axios from "axios";

// Pode ser algum servidor executando localmente:
// http://localhost:3000

const api = axios.create();
const api_key = "49f0f29739e21ecda580cd926a19075e";

export default {
    getMovie: async (id: any) => {
        let params = {
            api_key: api_key,
            language: "pt-BR"
        };
        return await api.get('https://api.themoviedb.org/3/movie/' + id, {params});
    },
    getVideos: async (id: any) => {
        let params = {
            api_key: api_key,
            language: "pt-BR"
        };
        return await api.get('https://api.themoviedb.org/3/movie/' + id + '/videos', {params});
    },
    getUpcomingMovies: async () => {
        let params = {
            page: Math.floor(Math.random() * (11 - 1 + 1) + 1),
            api_key: api_key,
            language: "pt-BR"
        };
        return await api.get('https://api.themoviedb.org/3/movie/upcoming', {params});
    },
    getLatestMovies: async () => {
        let params = {
            page: Math.floor(Math.random() * (11 - 1 + 1) + 1),
            api_key: api_key,
            language: "pt-BR"
        };
        return await api.get('https://api.themoviedb.org/3/movie/upcoming', {params});
    },
    getMovieList: async () => {
        let params = {
            page: Math.floor(Math.random() * (500 - 1 + 1) + 1),
            api_key: api_key,
            language: "pt-BR"
        };
        return await api.get('https://api.themoviedb.org/3/movie/popular', {params});
    },
    getGenreList: async () => {
        let params = {
            api_key: api_key,
            language: "pt-BR"
        };
        return await api.get('https://api.themoviedb.org/3/genre/movie/list', {params});
    },
    getSearch: async (name: any, keywords: any, page = 1) => {
        let params = {
            api_key: api_key,
            language: "pt-BR",
            include_adult: false,
            page: page
        };
        if (name !== null) {
            Object.assign(params, {query: name.toString()});
        }
        return await api.get('https://api.themoviedb.org/3/search/movie', {params});
    },
    getMovieByGenres: async (genres: any, page = 1) => {
        let params = {
            api_key: api_key,
            language: "pt-BR",
            with_genres: genres.toString(),
            page: page
        };
        return await api.get('https://api.themoviedb.org/3/discover/movie', {params});
    },
};
