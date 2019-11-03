import vars from '../vars';

const getAllNewsSources = async () => {
    try {
        const newsApiResponse = await fetch(`${vars.newsApiUrl}/sources?language=en&apiKey=${vars.newsApiKey}`);
        const newsApiJsonResponse = await newsApiResponse.json();
        return newsApiJsonResponse.sources;
    } catch (error) {
        console.log(error);
        throw new Error('err');
    }
};

const getNewsAtriclesForSource = async (sourceId) => {
    try {
        const newsApiResponse = await fetch(`${vars.newsApiUrl}/everything?sources=${sourceId}&apiKey=${vars.newsApiKey}`);
        const newsApiJsonResponse = await newsApiResponse.json();
        return newsApiJsonResponse.articles;
    } catch (error) {
        console.log(error);
        throw new Error('err');
    }
};

export default {
    getAllNewsSources,
    getNewsAtriclesForSource,
};
