import axios from "axios";
import { getData, getDataId, searchData, getDataVideos } from "../../api/tmdb";

vi.mock("axios");

describe("TMDB API", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test("getData fetches data based on category, page, and sort order", async () => {
        const mockResponse = { data: { results: [{ id: 1, title: "Mock Movie" }] } };
        axios.get.mockResolvedValue(mockResponse);

        const data = await getData("filmes", 1, "popular");
        expect(axios.get).toHaveBeenCalledWith(
            "https://api.themoviedb.org/3/movie/popular",
            {
                params: {
                    api_key: "14514ec469a15f3118f1c70d35c5ae32",
                    language: "pt-BR",
                    page: 1,
                },
            }
        );
        expect(data).toEqual(mockResponse.data.results);
    });

    test("getDataId fetches data by ID", async () => {
        const mockResponse = { data: { id: 1, title: "Mock Movie" } };
        axios.get.mockResolvedValue(mockResponse);

        const data = await getDataId("filmes", 1);
        expect(axios.get).toHaveBeenCalledWith(
            "https://api.themoviedb.org/3/movie/1",
            {
                params: {
                    api_key: "14514ec469a15f3118f1c70d35c5ae32",
                    language: "pt-BR",
                },
            }
        );
        expect(data).toEqual(mockResponse.data);
    });

    test("searchData fetches search results based on query", async () => {
        const mockResponse = { data: { results: [{ id: 2, title: "Search Result" }] } };
        axios.get.mockResolvedValue(mockResponse);

        const data = await searchData("filmes", 1, "test query");
        expect(axios.get).toHaveBeenCalledWith(
            "https://api.themoviedb.org/3/search/movie",
            {
                params: {
                    api_key: "14514ec469a15f3118f1c70d35c5ae32",
                    language: "pt-BR",
                    page: 1,
                    query: "test%20query",
                },
            }
        );
        expect(data).toEqual(mockResponse.data.results);
    });

    test("searchData returns an empty array for an empty query", async () => {
        const data = await searchData("filmes", 1, "");
        expect(data).toEqual([]);
        expect(axios.get).not.toHaveBeenCalled();
    });

    test("getDataVideos fetches video data for a given category and ID", async () => {
        const mockResponse = {
            data: { results: [{ key: "mockTrailerKey", type: "Trailer", site: "YouTube" }] },
        };
        axios.get.mockResolvedValue(mockResponse);

        const data = await getDataVideos("filmes", 1);
        expect(axios.get).toHaveBeenCalledWith(
            "https://api.themoviedb.org/3/movie/1/videos",
            {
                params: {
                    api_key: "14514ec469a15f3118f1c70d35c5ae32",
                    language: "pt-BR",
                },
            }
        );
        expect(data).toEqual(mockResponse.data.results);
    });
});
